import { TrialEnrollmentStatusResponse } from "../../../dtos";
import { ClinicalTrialRepository } from "../../../repositories/clinical-trial.repository";


interface ClinicalTrialEnrollmentStatusUseCase {
    execute(id: string): Promise<TrialEnrollmentStatusResponse>;
}

export class GetClinicalTrialEnrollmentStatus implements ClinicalTrialEnrollmentStatusUseCase {
    constructor(
        private readonly repository: ClinicalTrialRepository
    ){}

    async execute(id: string): Promise<TrialEnrollmentStatusResponse> {
        return this.repository.getClinicalTrialEnrollmentStatus(id);
    }
}