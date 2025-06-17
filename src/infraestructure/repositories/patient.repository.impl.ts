import { CreatePatientDto, PatientDataSource, PatientEntity, PatientRepository, UpdatePatientDto } from "../../domain";


export class PatientRepositoryImpl implements PatientRepository{
    constructor(
        private readonly datasource: PatientDataSource
    ){}
    
    
    create(createPatientDto: CreatePatientDto): Promise<PatientEntity> {
        return this.datasource.createPatient(createPatientDto);
    }
    getAll(): Promise<PatientEntity[]> {
        return this.datasource.getAllPatients();
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
}