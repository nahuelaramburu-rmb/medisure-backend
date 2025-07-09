import { PaginationDto, PatientEntity, PatientRepository } from "../..";



export interface GetPatientsUseCase{
    execute(paginationDto:PaginationDto): Promise<PatientEntity[]>,
}
export class GetPatients implements GetPatientsUseCase{
    constructor(
        private readonly patientRepository: PatientRepository,
    ){}
    execute(paginationDto:PaginationDto): Promise<PatientEntity[]> {
        return this.patientRepository.getAll(paginationDto);
    }
}