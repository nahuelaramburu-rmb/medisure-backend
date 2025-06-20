import { MedicalRecordEntity } from "../../entities/medical-record.entity";
import { MedicalRecordRepository } from "../../repositories/medical-record.repository";


export interface GetMedicalRecordByIdUseCase {
    execute(id: string): Promise<MedicalRecordEntity>;
}

export class GetMedicalRecordById implements GetMedicalRecordByIdUseCase{
    constructor(
        private readonly repository: MedicalRecordRepository,
    ){}

    execute(id: string): Promise<MedicalRecordEntity> {
        return this.repository.getById(id);
    }

}