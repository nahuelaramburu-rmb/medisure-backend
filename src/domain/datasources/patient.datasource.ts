import { CreatePatientDto, PaginationDto, PatientEntity, UpdatePatientDto, UserEntity } from "..";


export abstract class PatientDataSource {
    
    abstract createPatient(createPatientDto: CreatePatientDto, userEntity: UserEntity): Promise<PatientEntity>;
    abstract getAllPatients(paginationDto: PaginationDto): Promise<PatientEntity[]>;
    abstract getPatientById(id: string): Promise<PatientEntity>;
    abstract updatePatient(updatePatientDto: UpdatePatientDto): Promise<PatientEntity>;
    abstract deletePatient(id: string): Promise<PatientEntity>;

    abstract getPatientByMedicalRecordNumber(medical_record_number: string): Promise<PatientEntity>;
    abstract existMedicalRecordNumber(medical_record_number: string): Promise<boolean>;

    abstract getPatientsByDateRange(startDate?: Date, endDate?: Date): Promise<PatientEntity[]>;
}