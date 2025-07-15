import { TrialEnrollmentStatusResponse } from "../../../dtos";
import { ClinicalTrialRepository } from "../../../repositories/clinical-trial.repository";



interface ClinicalTrialUseCase{
    execute(): Promise<TrialEnrollmentStatusResponse>;
}

export class GetClinicalTrialSummary implements ClinicalTrialUseCase {
    constructor(
        private readonly repository: ClinicalTrialRepository
    ){}
    async execute(): Promise<TrialEnrollmentStatusResponse> {
        return this.repository.getClinicalTrialSummary();
    }
}