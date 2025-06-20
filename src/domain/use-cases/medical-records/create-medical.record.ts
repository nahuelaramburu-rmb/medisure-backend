import { CreateMedicalRecordDto } from "../../dtos";
import { MedicalRecordEntity } from "../../entities/medical-record.entity";
import { MedicalRecordRepository } from "../../repositories/medical-record.repository";

export interface CreateMedicalRecordUseCase {
    execute(createRoleDto: CreateMedicalRecordDto): Promise<MedicalRecordEntity>;
}

export class CreateMedicalRecord implements CreateMedicalRecordUseCase{
    constructor(
        private readonly repository: MedicalRecordRepository,
    ){}

    execute(createMedicalRecordDto: CreateMedicalRecordDto): Promise<MedicalRecordEntity> {
        return this.repository.create(createMedicalRecordDto);
    }

}