import { CreatePatientDto, PaginationDto, PatientDataSource, PatientEntity, PatientRepository, UpdatePatientDto, UserEntity } from "../../domain";


export class PatientRepositoryImpl implements PatientRepository{
    constructor(
        private readonly datasource: PatientDataSource
    ){}
    
    
    create(createPatientDto: CreatePatientDto, userEntity:UserEntity): Promise<PatientEntity> {
        return this.datasource.createPatient(createPatientDto, userEntity);
    }
    getAll(paginationDto:PaginationDto): Promise<PatientEntity[]> {
        return this.datasource.getAllPatients(paginationDto);
    }
    getById(id: string): Promise<PatientEntity> {
        return this.datasource.getPatientById(id);
    }
    updateById(updatePatientDto: UpdatePatientDto): Promise<PatientEntity> {
        return this.datasource.updatePatient(updatePatientDto);
    }
    deleteById(id: string): Promise<PatientEntity> {
        return this.datasource.deletePatient(id);
    }
    
    getByMedicalRecordNumber(medical_record_number: string): Promise<PatientEntity> {
        return this.datasource.getPatientByMedicalRecordNumber(medical_record_number);
    }
    existMedicalRecordNumber(medical_record_number: string): Promise<boolean> {
        return this.datasource.existMedicalRecordNumber(medical_record_number);
    }
    getPatientsByDateRange(startDate?: Date, endDate?: Date): Promise<PatientEntity[]> {
        return this.datasource.getPatientsByDateRange(startDate, endDate);
    }
}