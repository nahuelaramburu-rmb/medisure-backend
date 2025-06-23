import { CohortEntity, CohortRepository } from "../..";
import { CreateCohortDto } from "../../dtos";



export interface CreateCohorttUseCase {
    execute(dto: CreateCohortDto): Promise<CohortEntity>;  
}

export class CreateCohort implements CreateCohorttUseCase {
    constructor(
        private readonly repository: CohortRepository,
    ) {}

    async execute(dto: CreateCohortDto): Promise<CohortEntity> {
        return this.repository.createCohort(dto);
        
    }
}