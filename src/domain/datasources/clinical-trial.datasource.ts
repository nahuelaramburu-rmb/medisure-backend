import { CreateClinicalTrialDto, UpdateClinicalTrialDto } from "../dtos";
import { ClinicalTrialEntity } from "../entities/clinical-trial.entity";


export abstract class ClinicalTrialDataSource {

    abstract create(createClinicalTrialDto: CreateClinicalTrialDto): Promise<ClinicalTrialEntity>;
    abstract getById(id: string): Promise<ClinicalTrialEntity>;
    abstract getAll(): Promise<ClinicalTrialEntity[]>;
    abstract updateById(updateClinicalTrialDto: UpdateClinicalTrialDto): Promise<ClinicalTrialEntity>;
    abstract deleteById(id: string): Promise<ClinicalTrialEntity>;

}