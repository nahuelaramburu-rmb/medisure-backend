import { CohortEntity, CohortRepository } from "../..";



export interface GetCohortstUseCase {
    execute(): Promise<CohortEntity[]>;  
}

export class GetCohorts implements GetCohortstUseCase {
    constructor(
        private readonly repository: CohortRepository,
    ) {}

    async execute(): Promise<CohortEntity[]> {
        return this.repository.getAllCohorts();
        
    }
}