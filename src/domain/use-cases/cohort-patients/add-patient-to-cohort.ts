import { CohortPatientRepository } from "../../repositories/patient-cohort.repository";
import { CreatePatientCohortDto } from '../../dtos/patient-cohort/create-patient-cohort.dto';
import { CohortPatientEntity } from "../../entities/cohort-patient.entity";


export class AddPatientToCohort{
    constructor( private readonly repository: CohortPatientRepository ){}
    async execute(dto: CreatePatientCohortDto):Promise<CohortPatientEntity>{
        return this.repository.addPatient(dto);
    }
}