import { RemovePatientFromCohortDto } from "../../dtos/patient-cohort/remove-patient-cohort.dto";
import { CohortPatientEntity } from "../../entities/cohort-patient.entity";
import { CohortPatientRepository } from "../../repositories/patient-cohort.repository";


export class RemovePatientFromCohort{
    constructor(private readonly repository: CohortPatientRepository) {}
    async execute(dto: RemovePatientFromCohortDto): Promise<CohortPatientEntity>{
        return this.repository.removePatient(dto);
    }
}