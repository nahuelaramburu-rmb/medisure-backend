import { prisma } from "../../data/postgres";
import { CreateClinicalTrialDto, CustomError, TrialEnrollmentStatusResponse, TrialStatusBreakdown, UpdateClinicalTrialDto} from "../../domain";
import { ClinicalTrialDataSource } from "../../domain/datasources/clinical-trial.datasource";
import { ClinicalTrialEntity } from "../../domain/entities/clinical-trial.entity";
import { clinical_trials } from '../../generated/prisma/index';


export class ClinicalTrialDataSourceImpl implements ClinicalTrialDataSource{

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
        if ( !clinicalTrial) throw new CustomError(404,`Clinical Trial not found ${id}` );
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

    async getClinicalTrialSumary(): Promise<TrialEnrollmentStatusResponse> {
        const total_clinical_trials = await prisma.clinical_trials.count();

        const status_breakdown_raw = await prisma.clinical_trials.groupBy({
            by: ['status'],
            _count: {status: true},
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

        const summary: TrialEnrollmentStatusResponse = {
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
}