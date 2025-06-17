import { CreatePatientDto, CustomError, PatientEntity, PatientRepository } from "../..";



export interface CreatePatientUseCase {
    execute(createPatientDto: CreatePatientDto): Promise<PatientEntity>;  
}

export class CreatePatient implements CreatePatientUseCase {
    constructor(
        private readonly patientRepository: PatientRepository,
    ) {}

    async execute(createPatientDto: CreatePatientDto): Promise<PatientEntity> {
        const exist = await this.patientRepository.existMedicalRecordNumber(createPatientDto.medical_record_number);
        if (exist) {
            throw CustomError.conflict("Medical record number already exists");
        }

        return this.patientRepository.create(createPatientDto);
        
    }
}