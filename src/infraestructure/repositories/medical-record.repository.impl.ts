import { CreateMedicalRecordDto, MedicalRecordDataSource, MedicalRecordEntity, MedicalRecordRepository, UpdateMedicalRecordDto } from "../../domain";


export class MedicalRecordRepositoryImpl implements MedicalRecordRepository {
    constructor(
        private readonly medicalDatasource: MedicalRecordDataSource
    ){}
    create(createMedicalRecordDto: CreateMedicalRecordDto): Promise<MedicalRecordEntity> {
        return this.medicalDatasource.createMedicalRecord(createMedicalRecordDto);
    }
    getAll(): Promise<MedicalRecordEntity[]> {
        return this.medicalDatasource.getAllMedicalRecords();
    }
    getById(id: string): Promise<MedicalRecordEntity> {
        return this.medicalDatasource.getMedicalRecordById(id);
    }
    updateById(updateMedicalRecordDto: UpdateMedicalRecordDto): Promise<MedicalRecordEntity> {
        return this.medicalDatasource.updateMedicalRecord(updateMedicalRecordDto);
    }
    deleteById(id: string): Promise<MedicalRecordEntity> {
        return this.medicalDatasource.deleteMedicalRecord(id);
    }
    getRecentRecordsWithCriticalSeverity(timeThreshold: Date): PromiseLike<MedicalRecordEntity[]> {
        return this.medicalDatasource.getRecentRecordsWithCriticalSeverity(timeThreshold);
    }
}