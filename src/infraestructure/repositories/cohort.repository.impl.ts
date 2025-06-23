import { CohortEntity, CreateCohortDto, UpdateCohortDto } from '../../domain';
import { CohortRepository } from '../../domain/repositories/cohort.repository';


export class CohortRepositoryImpl implements CohortRepository {
    constructor(
        private readonly datasource: CohortRepository
    ){}

    getAllCohorts(): Promise<CohortEntity[]> {
        return this.datasource.getAllCohorts();
    }

    getCohortById(id: string): Promise<CohortEntity> {
        return this.datasource.getCohortById(id);
    }

    createCohort(createCohortDto: CreateCohortDto): Promise<CohortEntity> {
        return this.datasource.createCohort(createCohortDto);
    }

    updateCohort(updateCohortDto: UpdateCohortDto): Promise<CohortEntity> {
        return this.datasource.updateCohort(updateCohortDto);
    }

    deleteCohort(id: string): Promise<CohortEntity> {
        return this.datasource.deleteCohort(id);
    }
}