import { CreatePatientCohortDto } from "../dtos/patient-cohort/create-patient-cohort.dto";
import { RemovePatientFromCohortDto } from "../dtos/patient-cohort/remove-patient-cohort.dto";
import { CohortPatientEntity } from "../entities/cohort-patient.entity";


export interface CohortPatientRepository{
    addPatient(dto: CreatePatientCohortDto):Promise<CohortPatientEntity>;
    removePatient(dto: RemovePatientFromCohortDto):Promise<CohortPatientEntity>;
    getPatientsByCohort(cohortId: string): Promise<CohortPatientEntity[]>;
}