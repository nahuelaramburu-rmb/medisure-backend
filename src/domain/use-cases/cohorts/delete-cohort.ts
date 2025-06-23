import { CohortEntity, CohortRepository } from "../..";



export interface DeleteCohorttUseCase {
    execute(id:string): Promise<CohortEntity>;  
}

export class DeleteCohort implements DeleteCohorttUseCase {
    constructor(
        private readonly repository: CohortRepository,
    ) {}

    async execute(id:string): Promise<CohortEntity> {
        return this.repository.deleteCohort(id);
        
    }
}