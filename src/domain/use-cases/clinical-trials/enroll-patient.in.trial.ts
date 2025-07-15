import { EnrollPatientDto } from "../../dtos";
import { ClinicalTrialRepository } from "../../repositories/clinical-trial.repository";


interface EnrollPatientInTrialUseCase {
    execute(enrollPatientDto: EnrollPatientDto, id: string): Promise<any>;
}
export class EnrollPatientInTrial implements EnrollPatientInTrialUseCase {
    constructor(
        private readonly repository: ClinicalTrialRepository
    ){}

    async execute(enrollPatientDto: EnrollPatientDto, id: string): Promise<any> {
        return this.repository.enrollPatientInTrial(enrollPatientDto, id);
    }
}