import { CreatePatientDto, PatientEntity, UpdatePatientDto } from "..";


export abstract class PatientRepository{
    
    

    abstract create (createPatientDto: CreatePatientDto): Promise<PatientEntity>;
    abstract getAll(): Promise<PatientEntity[]>;
    abstract getById(id: string): Promise<PatientEntity>;
    abstract updateById(updatePatientDto: UpdatePatientDto): Promise<PatientEntity>;
    abstract deleteById(id: string): Promise<PatientEntity>;
    
    abstract getByMedicalRecordNumber(medical_record_number: string): Promise<PatientEntity>;
    abstract existMedicalRecordNumber(medical_record_number: string): Promise<boolean>;

    abstract getPatientsByDateRange(startDate?: Date, endDate?: Date): Promise<PatientEntity[]>;
}