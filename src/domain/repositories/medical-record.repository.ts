import { CreateMedicalRecordDto, MedicalRecordEntity, UpdateMedicalRecordDto } from "..";


export abstract class MedicalRecordRepository{
    abstract create (createMedicalRecordDto: CreateMedicalRecordDto): Promise<MedicalRecordEntity>;
    abstract getAll(): Promise<MedicalRecordEntity[]>;
    abstract getById(id: string): Promise<MedicalRecordEntity>;
    abstract updateById(updateMedicalRecordDto: UpdateMedicalRecordDto): Promise<MedicalRecordEntity>;
    abstract deleteById(id: string): Promise<MedicalRecordEntity>;
}