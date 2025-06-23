import { CreatePatient } from "../../domain";
import { CohortPatientDataSource } from "../../domain/datasources/patient-cohort.datasource";
import { CreatePatientCohortDto } from "../../domain/dtos/patient-cohort/create-patient-cohort.dto";
import { RemovePatientFromCohortDto } from "../../domain/dtos/patient-cohort/remove-patient-cohort.dto";
import { CohortPatientEntity } from "../../domain/entities/cohort-patient.entity";
import { CohortPatientRepository } from "../../domain/repositories/patient-cohort.repository";



export class CohortPatientRepositoryImpl implements CohortPatientRepository{
    constructor(private readonly datasource: CohortPatientDataSource){}
    addPatient(dto: CreatePatientCohortDto): Promise<CohortPatientEntity> {
        return this.datasource.addPatientToCohort(dto);
    }
    removePatient(dto: RemovePatientFromCohortDto): Promise<CohortPatientEntity> {
        return this.datasource.removePatient(dto);
    }
    getPatientsByCohort(cohortId: string): Promise<CohortPatientEntity[]> {
        return this.datasource.getPatientsByCohort(cohortId);
    }

}