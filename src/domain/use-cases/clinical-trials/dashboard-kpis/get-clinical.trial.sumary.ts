import { TrialEnrollmentResponse } from "../../../dtos";
import { ClinicalTrialRepository } from "../../../repositories/clinical-trial.repository";



interface ClinicalTrialUseCase{
    execute(): Promise<TrialEnrollmentResponse>;
}

export class GetClinicalTrialSummary implements ClinicalTrialUseCase {
    constructor(
        private readonly repository: ClinicalTrialRepository
    ){}
    async execute(): Promise<TrialEnrollmentResponse> {
        return this.repository.getClinicalTrialSummary();
    }
}