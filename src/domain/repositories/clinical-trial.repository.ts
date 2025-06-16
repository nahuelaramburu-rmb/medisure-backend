import { CreateClinicalTrialDto, UpdateClinicalTrialDto } from "../dtos";
import { ClinicalTrialEntity } from "../entities/clinical-trial.entity";


export abstract class ClinicalTrialRepository{
    abstract create(clinicalTrialDto: CreateClinicalTrialDto): Promise<ClinicalTrialEntity>;
    abstract getAll():Promise<ClinicalTrialEntity[]>;
    abstract getById(id: string): Promise<ClinicalTrialEntity>;
    abstract updateById(updateClinicalTrialDto: UpdateClinicalTrialDto): Promise<ClinicalTrialEntity>;
    abstract deleteById(id: string): Promise<ClinicalTrialEntity>;
}