import { ClinicalTrialRepository } from "../..";
import { ClinicalTrialEntity } from "../../entities/clinical-trial.entity";



export interface GetClinicalTrialsUseCase {
    execute(): Promise<ClinicalTrialEntity[]>;
}

export class GetClinicalTrials implements GetClinicalTrialsUseCase{
    constructor(
        private readonly clinicalTrialRepository: ClinicalTrialRepository,
    ){}
    execute(): Promise<ClinicalTrialEntity[]> {
        return this.clinicalTrialRepository.getAll();
    }
}