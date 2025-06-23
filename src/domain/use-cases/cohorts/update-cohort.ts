import { CohortEntity, CohortRepository, UpdateCohortDto } from "../..";


export interface UpdateCohorttUseCase {
    execute(dto: UpdateCohortDto): Promise<CohortEntity>;  
}

export class UpdateCohort implements UpdateCohorttUseCase {
    constructor(
        private readonly repository: CohortRepository,
    ) {}

    async execute(dto: UpdateCohortDto): Promise<CohortEntity> {
        return this.repository.updateCohort(dto);
        
    }
}