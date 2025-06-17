import { PatientEntity, PatientRepository, UpdatePatientDto } from "../..";



export interface UpdatePatientUseCase{
    execute( dto: UpdatePatientDto): Promise<PatientEntity>,
}

export class UpdatePatient implements UpdatePatientUseCase{
    constructor(
        private readonly patientRepository: PatientRepository,
    ){}
    execute(dto: UpdatePatientDto): Promise<PatientEntity> {
        return this.patientRepository.updateById(dto);
    }
}