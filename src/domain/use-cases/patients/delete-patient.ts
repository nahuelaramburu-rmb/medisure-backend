import { PatientEntity, PatientRepository } from "../..";


export interface DeletePatientUseCase{
    execute(id: string): Promise<PatientEntity>;
}

export class DeletePatient implements DeletePatientUseCase{
    constructor(
        private readonly patientRepository: PatientRepository,
    ){}
    execute(id: string): Promise<PatientEntity> {
        return this.patientRepository.deleteById(id);
    }

}