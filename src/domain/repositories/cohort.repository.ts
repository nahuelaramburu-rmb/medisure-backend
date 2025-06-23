import { CohortEntity, CreateCohortDto, UpdateCohortDto } from "..";


export abstract class CohortRepository{
    abstract getAllCohorts(): Promise<CohortEntity[]>;
    abstract getCohortById(id: string): Promise<CohortEntity>;
    abstract createCohort(createCohortDto: CreateCohortDto): Promise<CohortEntity>;
    abstract updateCohort(updateCohortDto: UpdateCohortDto): Promise<CohortEntity>;
    abstract deleteCohort(id: string): Promise<CohortEntity>;
}