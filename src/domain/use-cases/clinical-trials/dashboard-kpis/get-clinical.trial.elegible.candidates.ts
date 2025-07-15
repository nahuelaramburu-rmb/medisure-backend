import { PaginationDto, TrialElegibleCandidateResponse } from "../../../dtos";
import { ClinicalTrialRepository } from "../../../repositories/clinical-trial.repository";


interface GetClinicalTrialElegibleCandidatesUseCase {
    execute(id: string, paginationDto: PaginationDto, minScore?: number): Promise<TrialElegibleCandidateResponse>;
}

export class GetClinicalTrialElegibleCandidates implements GetClinicalTrialElegibleCandidatesUseCase {
    constructor(
        private readonly repository: ClinicalTrialRepository
    ){}

    async execute(id: string, paginationDto: PaginationDto, minScore?:number): Promise<TrialElegibleCandidateResponse> {
        
        return this.repository.getClinicalTrialEligibleCandidates(id, paginationDto, minScore);
    }
}