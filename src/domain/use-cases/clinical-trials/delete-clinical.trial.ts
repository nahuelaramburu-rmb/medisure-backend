import { ClinicalTrialEntity } from "../../entities/clinical-trial.entity";
import { ClinicalTrialRepository } from "../../repositories/clinical-trial.repository";


export interface DeleteClinicalTrialUseCase {
    execute(id:string):Promise<ClinicalTrialEntity>;
}

export class DeleteClinicalTrial implements DeleteClinicalTrialUseCase {
    constructor(
        private readonly clinicalTrialRepository: ClinicalTrialRepository,
    ){}

    execute(id: string): Promise<ClinicalTrialEntity> {
        return this.clinicalTrialRepository.deleteById(id);
    }
}