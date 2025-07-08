import { CreateMedicalRecordDto, MedicalRecordEntity, UpdateMedicalRecordDto } from "..";


export abstract class MedicalRecordDataSource {
    abstract createMedicalRecord(createMedicalRecordDto: CreateMedicalRecordDto): Promise<MedicalRecordEntity>
    abstract getAllMedicalRecords(): Promise<MedicalRecordEntity[]>
    abstract getMedicalRecordById(id: string): Promise<MedicalRecordEntity>;
    abstract updateMedicalRecord(updateMedicalRecordDto: UpdateMedicalRecordDto): Promise<MedicalRecordEntity>;
    abstract deleteMedicalRecord(id: string): Promise<MedicalRecordEntity>;

    abstract getRecentRecordsWithCriticalSeverity(timeThreshold: Date): Promise<MedicalRecordEntity[]>;
}