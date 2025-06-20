import { MedicalRecordEntity } from "../../entities/medical-record.entity";
import { MedicalRecordRepository } from "../../repositories/medical-record.repository";


export interface GetMedicalRecordsUseCase {
    execute(): Promise<MedicalRecordEntity[]>;
}

export class GetMedicalRecords implements GetMedicalRecordsUseCase{
    constructor(
        private readonly repository: MedicalRecordRepository,
    ){}

    execute(): Promise<MedicalRecordEntity[]> {
        return this.repository.getAll();
    }

}