import { CreatePatientDto, PatientEntity, UpdatePatientDto } from "..";


export abstract class PatientDataSource {
    
    abstract createPatient(createPatientDto: CreatePatientDto): Promise<PatientEntity>;
    abstract getAllPatients(): Promise<PatientEntity[]>;
    abstract getPatientById(id: string): Promise<PatientEntity>;
    abstract updatePatient(updatePatientDto: UpdatePatientDto): Promise<PatientEntity>;
    abstract deletePatient(id: string): Promise<PatientEntity>;

    abstract getPatientByMedicalRecordNumber(medical_record_number: string): Promise<PatientEntity>;
    abstract existMedicalRecordNumber(medical_record_number: string): Promise<boolean>;

    abstract getPatientsByDateRange(startDate?: Date, endDate?: Date): Promise<PatientEntity[]>;
}