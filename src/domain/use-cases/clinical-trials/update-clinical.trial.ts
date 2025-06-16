import { UpdateClinicalTrialDto } from "../../dtos";
import { ClinicalTrialEntity } from "../../entities/clinical-trial.entity";
import { ClinicalTrialRepository } from "../../repositories/clinical-trial.repository";


export interface UpdateClinicalTrialUseCase {
    execute(updateClinicalTrialDto: UpdateClinicalTrialDto): Promise<ClinicalTrialEntity>;
}

export class UpdateClinicalTrial implements UpdateClinicalTrialUseCase {
    constructor(
        private readonly clinicalTrialRepository: ClinicalTrialRepository,
    ) {}

    execute(updateClinicalTrialDto: UpdateClinicalTrialDto): Promise<ClinicalTrialEntity> {
        return this.clinicalTrialRepository.updateById(updateClinicalTrialDto);
    }
}