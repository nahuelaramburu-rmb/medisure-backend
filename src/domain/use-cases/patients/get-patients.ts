import { PatientEntity, PatientRepository } from "../..";



export interface GetPatientsUseCase{
    execute(): Promise<PatientEntity[]>,
}
export class GetPatients implements GetPatientsUseCase{
    constructor(
        private readonly patientRepository: PatientRepository,
    ){}
    execute(): Promise<PatientEntity[]> {
        return this.patientRepository.getAll();
    }
}