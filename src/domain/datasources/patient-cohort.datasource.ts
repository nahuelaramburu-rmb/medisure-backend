import { CreatePatientCohortDto } from "../dtos/patient-cohort/create-patient-cohort.dto";
import { CohortPatientEntity } from "../entities/cohort-patient.entity";
import { RemovePatientFromCohortDto } from '../dtos/patient-cohort/remove-patient-cohort.dto';


export abstract class CohortPatientDataSource{
    abstract addPatientToCohort(dto: CreatePatientCohortDto): Promise<CohortPatientEntity>;
    abstract removePatient(dto: RemovePatientFromCohortDto): Promise<CohortPatientEntity>;
    abstract getPatientsByCohort(cohortId: string): Promise<CohortPatientEntity[]>;
}