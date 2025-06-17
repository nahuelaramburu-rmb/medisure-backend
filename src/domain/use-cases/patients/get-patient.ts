import { PatientEntity, PatientRepository } from "../..";



export interface GetPatientByIdUseCase{
    execute(id: string): Promise<PatientEntity>,
}
export class GetPatientById implements GetPatientByIdUseCase{
    constructor(
        private readonly patientRepository: PatientRepository,
    ){}
    execute(id:string): Promise<PatientEntity> {
        return this.patientRepository.getById(id);
    }
}