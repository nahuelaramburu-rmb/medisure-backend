import { CreatePatientDto, PaginationDto, PatientEntity, UpdatePatientDto, UserEntity } from "..";


export abstract class PatientRepository{
    
    

    abstract create (createPatientDto: CreatePatientDto, userEntity: UserEntity): Promise<PatientEntity>;
    abstract getAll(paginationDto?: PaginationDto): Promise<PatientEntity[]>;
    abstract getById(id: string): Promise<PatientEntity>;
    abstract updateById(updatePatientDto: UpdatePatientDto): Promise<PatientEntity>;
    abstract deleteById(id: string): Promise<PatientEntity>;
    
    abstract getByMedicalRecordNumber(medical_record_number: string): Promise<PatientEntity>;
    abstract existMedicalRecordNumber(medical_record_number: string): Promise<boolean>;

    abstract getPatientsByDateRange(startDate?: Date, endDate?: Date): Promise<PatientEntity[]>;
}