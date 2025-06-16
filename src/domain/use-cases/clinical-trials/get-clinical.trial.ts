import { ClinicalTrialEntity } from "../../entities/clinical-trial.entity";
import { ClinicalTrialRepository } from "../../repositories/clinical-trial.repository";

export interface GetClinicalTrialUseCase{
    execute(id: string): Promise<ClinicalTrialEntity>;
}

export class GetClinicalTrial implements GetClinicalTrialUseCase {
    constructor(
        private readonly clinicalTrialRepository: ClinicalTrialRepository,
    ) {}

    execute(id: string): Promise<ClinicalTrialEntity> {
        return this.clinicalTrialRepository.getById(id);
    }
}