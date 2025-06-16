import { CreateClinicalTrialDto } from '../../dtos';
import { ClinicalTrialEntity } from '../../entities/clinical-trial.entity';
import { ClinicalTrialRepository } from '../../repositories/clinical-trial.repository';



export interface CreateClinicalTrialUseCase {
    execute(createClinicalTrialDto: CreateClinicalTrialDto): Promise<ClinicalTrialEntity>;  
}

export class CreateClinicalTrial implements CreateClinicalTrialUseCase {
    constructor(
        private readonly clinicalTrialRepository: ClinicalTrialRepository,
    ) {}

    execute(createClinicalTrialDto: CreateClinicalTrialDto): Promise<ClinicalTrialEntity> {
        return this.clinicalTrialRepository.create(createClinicalTrialDto);
    }
}