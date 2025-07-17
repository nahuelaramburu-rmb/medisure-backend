import { prisma } from "../../data/postgres";
import { CreateClinicalTrialDto, CustomError, EnrollPatientDto, GetKpiAcrossTrialsDto, GroupBy, PaginationDto, TrialElegibleCandidateResponse, TrialEnrollmentResponse, TrialEnrollmentStatusResponse, TrialStatusBreakdown, UpdateClinicalTrialDto } from "../../domain";
import { ClinicalTrialDataSource } from "../../domain/datasources/clinical-trial.datasource";
import { ClinicalTrialEntity } from "../../domain/entities/clinical-trial.entity";

import { TrialPerformanceMetricsResponse } from '../../domain/dtos/clinicalTrial/responses-format/trial.enrollment.status.response ';
import { handleError } from "../../presentation/helpers/errors";
import { ValidActions } from "../../domain/enums/index";


export class ClinicalTrialDataSourceImpl implements ClinicalTrialDataSource {

    async create(createClinicalTrialDto: CreateClinicalTrialDto): Promise<ClinicalTrialEntity> {

        const clinicalTrial = await prisma.clinical_trials.create({
            data: createClinicalTrialDto!
        })
        return ClinicalTrialEntity.fromObject(clinicalTrial);

    }
    async getById(id: string): Promise<ClinicalTrialEntity> {
        const clinicalTrial = await prisma.clinical_trials.findUnique({
            where: { id }
        });
        if (!clinicalTrial) throw new CustomError(404, `Clinical Trial not found ${id}`);
        return ClinicalTrialEntity.fromObject(clinicalTrial);
    }
    async getAll(): Promise<ClinicalTrialEntity[]> {

        const clinicalTrials = await prisma.clinical_trials.findMany();
        return clinicalTrials.map(clinicalTrial => ClinicalTrialEntity.fromObject(clinicalTrial));
    }
    async updateById(updateClinicalTrialDto: UpdateClinicalTrialDto): Promise<ClinicalTrialEntity> {
        await this.getById(updateClinicalTrialDto.id);

        const updatedClinicalTrial = await prisma.clinical_trials.update({
            where: { id: updateClinicalTrialDto.id },
            data: updateClinicalTrialDto!.values
        });

        return ClinicalTrialEntity.fromObject(updatedClinicalTrial);
    }

    async deleteById(id: string): Promise<ClinicalTrialEntity> {
        await this.getById(id);

        const deletedClinicalTrial = await prisma.clinical_trials.delete({
            where: { id }
        });

        return ClinicalTrialEntity.fromObject(deletedClinicalTrial);
    }

    async getClinicalTrialSumary(): Promise<TrialEnrollmentResponse> {
        const total_clinical_trials = await prisma.clinical_trials.count();

        const status_breakdown_raw = await prisma.clinical_trials.groupBy({
            by: ['status'],
            _count: { status: true },
        });
        const status_breakdown: Record<string, number> = {
            active: 0,
            completed: 0,
            suspended: 0,
            terminated: 0,
            planning: 0
        };
        status_breakdown_raw.forEach(item => {
            status_breakdown[item.status] = item._count.status;
        });

        const total_patints_enrolled_agg = await prisma.clinical_trials.aggregate({
            _sum: { patient_count: true }
        });

        const total_patients_enrolled = total_patints_enrolled_agg._sum.patient_count || 0;

        const summary: TrialEnrollmentResponse = {
            total_trials: total_clinical_trials,
            status_breakdown: {
                active: status_breakdown.active,
                completed: status_breakdown.completed,
                suspended: status_breakdown.suspended,
                terminated: status_breakdown.terminated,
                planning: status_breakdown.planning
            },
            total_patients_enrolled
        };

        return summary;

    }

    async getClinicalTrialEnrollmentStatus(id: string): Promise<TrialEnrollmentStatusResponse> {
        const clinicalTrial = await this.getById(id);

        const enrollmentStatus: TrialEnrollmentStatusResponse = {
            trialId: clinicalTrial.id,
            trialIdentifier: clinicalTrial.trial_identifier,
            title: clinicalTrial.title,
            currentEnrollment: clinicalTrial.patient_count || 0,
            status: clinicalTrial.status,
            startDate: clinicalTrial.start_date,
            endDate: clinicalTrial.end_date
        };

        return enrollmentStatus;
    }

    async getClinicalTrialEligibleCandidates(id: string, paginationDto: PaginationDto, minScore?: number): Promise<TrialElegibleCandidateResponse> {

        const clinicalTrial = await this.getById(id);

        const { limit, offset } = paginationDto;

        // get ids for enrolled patients
        const enrolledPatientsIds = await prisma.cohort_patients.findMany({
            where: { cohort_id: id }, // <-- CORREGIDO
            select: { patient_id: true }
        });

        const excludeIds = enrolledPatientsIds.map(patient => patient.patient_id);

        // not enrolled patients
        const patients = await prisma.patients.findMany({
            where: {
                id: { notIn: excludeIds }
            },
            skip: offset,
            take: limit,
        });

        // elegibility and criteria matching logic
        const candidates = await Promise.all(patients.map(async (patient) => {
            const matchedCriteria = [];
            const missingCriteria = [];

            // age
            const age = calculateAge(patient.date_of_birth);
            if (age >= 18 && age <= 65) {
                matchedCriteria.push(`Age: ${age}`);
            } else {
                missingCriteria.push(`Age: ${age}`);
            }

            // consent
            const consent = await prisma.patient_consents.findFirst({
                where: { patient_id: patient.id, is_accepted: true } // <-- CORREGIDO
            });
            if (consent) matchedCriteria.push(`Consent: ${consent.id}`);
            else missingCriteria.push(`Consent: Not provided`);

            // mock score calculation
            let elegibilityScore = 0;
            if (matchedCriteria.length === 2) elegibilityScore = 90;
            else if (matchedCriteria.length === 1) elegibilityScore = 70;
            else elegibilityScore = 40;

            
            return {
                patientId: patient.id,
                medicalRecordNumber: patient.medical_record_number,
                name: `${patient.first_name} ${patient.last_name}`,
                age,
                elegibilityScore,
                matchedCriteria: matchedCriteria.join(', '),
                missingCriteria: missingCriteria.join(', ')
            };
        }));

        // filter candidates based on minimum elegibility score
        const filteredCandidates = minScore ? candidates.filter(candidate => candidate.elegibilityScore >= minScore) : candidates;

        const totalCandidates = filteredCandidates.length;
        const hasMore = totalCandidates > (offset + limit);

        const elegibleCandidateStatus: TrialElegibleCandidateResponse = {
            candidates: filteredCandidates.slice(0, limit),
            totalCandidates,
            pagination: {
                limit,
                offset,
                hasMore
            }
        };

        return elegibleCandidateStatus;
    }



    async getClinicalTrialPerformanceMetrics(groupByDto: GetKpiAcrossTrialsDto): Promise<TrialPerformanceMetricsResponse> {
        const { startDate, endDate, groupBy } = groupByDto;
        console.log(startDate, endDate, groupBy);
        // 1. filter trials by date range
        const trials = await prisma.clinical_trials.findMany({
            where: {
                start_date: { gte: new Date(startDate) },
                end_date: { lte: new Date(endDate) }
            }
        });

        
        // 2. group trials by the specified field
        const groupMap = new Map<string, typeof trials>();
        for (const trial of trials) {
            let groupValue = '';
            switch (groupBy) {
                case GroupBy.Phase:
                    groupValue = trial.phase || 'N/A';
                    break;
                case GroupBy.Status:
                    groupValue = trial.status;
                    break;
                case GroupBy.Investigator:
                    groupValue = trial.principal_investigator_id || 'N/A';
                    break;
                default:
                    groupValue = 'all';
            }
            if (!groupMap.has(groupValue)) groupMap.set(groupValue, []);
            groupMap.get(groupValue)!.push(trial);
        }

        // 3. calculate KPIs for each group
        const metrics = [];
        for (const [groupName, groupTrials] of groupMap.entries()) {
            const activeTrials = groupTrials.filter(t => t.status === 'active').length;
            // targetEnrollment does not exists
            const currentEnrollment = groupTrials.reduce((sum, t) => sum + (t.patient_count || 0), 0);

            // avgEnrollment depends of targetEnrollment
            // avgDaysToFirstPatient, avgScreenFailureRate, avgDropoutRate 

            // enrollment rate is patients per month
            let topPerformer = null;
            let maxRate = 0;
            for (const t of groupTrials) {
                if (t.start_date && t.patient_count) {
                    const months = Math.max(1, ((t.end_date?.getTime() || Date.now()) - t.start_date.getTime()) / (1000 * 60 * 60 * 24 * 30));
                    const rate = t.patient_count / months;
                    if (rate > maxRate) {
                        maxRate = rate;
                        topPerformer = {
                            trialId: t.trial_identifier,
                            enrollmentRate: Number(rate.toFixed(2))
                        };
                    }
                }
            }
            
            metrics.push({
                groupName,
                groupValue: groupBy,
                kpis: {
                    activeTrials,
                    currentEnrollment
                },
                //topPerformer
            });
        }

        // 4. global kpis
        const totalActiveTrials = trials.filter(t => t.status === 'active').length;
        // globalEnrollmentRate: 
        let totalEnrollment = 0;
        let totalMonths = 0;
        for (const t of trials) {
            if (t.start_date && t.patient_count) {
                const months = Math.max(1, ((t.end_date?.getTime() || Date.now()) - t.start_date.getTime()) / (1000 * 60 * 60 * 24 * 30));
                totalEnrollment += t.patient_count;
                totalMonths += months;
            }
        }
        const globalEnrollmentRate = totalMonths > 0 ? Number((totalEnrollment / totalMonths).toFixed(2)) : 0;

        // projectedTrialsOnTime y projectedTrialsDelayed cannot calculate without more data

        const overallMetrics = {
            totalActiveTrials,
            globalEnrollmentRate,
        };

        return {
            metrics,
            overallMetrics,
            period: {
                start: startDate,
                end: endDate
            }
        };
    }
    async enrollPatientInTrial(enrollPatientDto: EnrollPatientDto, trialId: string): Promise<any> {
        const { cohortId, patientId, action, notes, enrollmentDate, assignedCoordinator } = enrollPatientDto;

        
        const clinicalTrial = await this.getById(trialId);
        const patient = await prisma.patients.findUnique({ where: { id: patientId } });
        if (!patient) throw new CustomError(404, `Patient not found ${patientId}`);

        //Search previous enrollment
        const cohort = await prisma.cohorts.findUnique({ where: { id: cohortId } });
        if (!cohort) throw new CustomError(404, `Cohort not found ${cohortId}`);

        const activeEnrollment = await prisma.cohort_patients.findFirst({
            where: { cohort_id: cohortId, patient_id: patientId, removed_at: null }
        });

        let newStatus = '';
        let enrollmentId = '';
        let trialEnrollmentCount = clinicalTrial.patient_count;

        switch (action) {
            case ValidActions.Enroll:
                if (activeEnrollment) throw new CustomError(400, 'Patient already enrolled');
                const enrollment = await prisma.cohort_patients.create({
                    data: {
                        cohort_id: cohortId,
                        patient_id: patientId,
                        added_by_user_id: assignedCoordinator,
                        notes,
                        added_at: enrollmentDate ? new Date(enrollmentDate) : new Date(),
                        removed_at: null
                    }
                });
                newStatus = 'enrolled';
                enrollmentId = enrollment.id;
                await prisma.clinical_trials.update({
                    where: { id: trialId },
                    data: { patient_count: { increment: 1 } }
                });
                trialEnrollmentCount += 1;

                break;

            case ValidActions.Withdraw:
                if (!activeEnrollment) throw new CustomError(400, 'Patient not enrolled');
                await prisma.cohort_patients.update({
                    where: { id: activeEnrollment.id },
                    data: { removed_at: new Date(), notes }
                });
                newStatus = 'withdrawn';
                enrollmentId = activeEnrollment.id;
                await prisma.clinical_trials.update({
                    where: { id: trialId },
                    data: { patient_count: { decrement: 1 } }
                });
                trialEnrollmentCount = Math.max(0, trialEnrollmentCount - 1);
                break;

            // Las siguientes acciones requieren un campo status o una tabla adicional
            case ValidActions.Screen:
            case ValidActions.Complete:
            case ValidActions.FailScreening:
                throw new CustomError(400, `Action ${action} not supported with current cohort_patients schema`);
            default:
                throw new CustomError(400, `Invalid action: ${action}`);
        }

        // Audit log
        try{
            await prisma.audit_logs?.create?.({
                data: {
                    user_id: assignedCoordinator,
                    action,
                    entity_type: 'cohort_patients',
                    entity_id: enrollmentId,
                    
                    
                }
            });
        } catch (error) {
            console.error('Error creating audit log:', error);
            throw new CustomError(500, 'Failed to create audit log');
        }

        // Simular notificación
        const notification = {
            sent: true,
            recipients: ['coordinator']
        };

        return {
            success: true,
            enrollmentId,
            newStatus,
            trialEnrollmentCount,
            notification
        };
    }
}

function calculateAge(dateOfBirth: Date): number {
    const today = new Date();
    const dob = new Date(dateOfBirth);
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
    return age;
}