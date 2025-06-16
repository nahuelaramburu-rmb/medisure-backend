import { ClinicalTrialRepository, CreateClinicalTrialDto, UpdateClinicalTrialDto } from "../../domain";
import { ClinicalTrialDataSource } from "../../domain/datasources/clinical-trial.datasource";
import { ClinicalTrialEntity } from "../../domain/entities/clinical-trial.entity";


export class ClinicalTrialRepositoryImpl implements ClinicalTrialRepository {
    
    constructor(private readonly dataSource: ClinicalTrialDataSource) {}

    async create(createClinicalTrialDto: CreateClinicalTrialDto): Promise<ClinicalTrialEntity> {
        return this.dataSource.create(createClinicalTrialDto);
    }

    async getAll(): Promise<ClinicalTrialEntity[]> {
        return this.dataSource.getAll();
    }

    async getById(id: string): Promise<ClinicalTrialEntity> {
        return this.dataSource.getById(id);
    }

    async updateById(updateClinicalTrialDto: UpdateClinicalTrialDto): Promise<ClinicalTrialEntity> {
        return this.dataSource.updateById(updateClinicalTrialDto);
    }

    async deleteById(id: string): Promise<ClinicalTrialEntity> {
        return this.dataSource.deleteById(id);
    }
}