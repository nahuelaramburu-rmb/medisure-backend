import { CohortEntity, CohortRepository } from "../..";



export interface GetCohorttUseCase {
    execute(id:string): Promise<CohortEntity>;  
}

export class GetCohortById implements GetCohorttUseCase {
    constructor(
        private readonly repository: CohortRepository,
    ) {}

    async execute(id:string): Promise<CohortEntity> {
        return this.repository.getCohortById(id);
        
    }
}