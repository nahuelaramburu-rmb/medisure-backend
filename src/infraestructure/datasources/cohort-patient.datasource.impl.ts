import { prisma } from "../../data/postgres";
import { CohortPatientDataSource } from "../../domain/datasources/patient-cohort.datasource";
import { CreatePatientCohortDto } from "../../domain/dtos/patient-cohort/create-patient-cohort.dto";
import { RemovePatientFromCohortDto } from "../../domain/dtos/patient-cohort/remove-patient-cohort.dto";
import { CohortPatientEntity } from "../../domain/entities/cohort-patient.entity";


export class CohortPatientDataSourceImpl extends CohortPatientDataSource{
    async addPatientToCohort(dto: CreatePatientCohortDto): Promise<CohortPatientEntity> {
        const record = await prisma.cohort_patients.create({
            data: { 
                cohort_id: dto.cohort_id,
                patient_id: dto.patient_id,
                added_by_user_id: dto.added_by_user_id,
                notes: dto.notes,
            }
        });
        return CohortPatientEntity.fromObject(record);
    }
    async removePatient(dto: RemovePatientFromCohortDto): Promise<CohortPatientEntity> {
        const record = await prisma.cohort_patients.updateMany({
            where: {
                cohort_id: dto.cohort_id,
                patient_id: dto.patient_id,
                removed_at: null
            },
            data:{
                removed_at: dto.removed_at
            }
        })
        //todo: if no records were updated, throw an error
        return CohortPatientEntity.fromObject(record);
    }
    async getPatientsByCohort(cohortId: string): Promise<CohortPatientEntity[]> {
        const record = await prisma.cohort_patients.findMany({
            where: { cohort_id: cohortId}
        })

        return record.map(cohortPatient => CohortPatientEntity.fromObject(cohortPatient));
    }

}