import { UpdateMedicalRecordDto } from "../../dtos";
import { MedicalRecordEntity } from "../../entities/medical-record.entity";
import { MedicalRecordRepository } from "../../repositories/medical-record.repository";


export interface UpdateMedicalRecordUseCase {
    execute(updateRoleDto: UpdateMedicalRecordDto): Promise<MedicalRecordEntity>;
}

export class UpdateMedicalRecord implements UpdateMedicalRecordUseCase{
    constructor(
        private readonly repository: MedicalRecordRepository,
    ){}

    execute(updateMedicalRecordDto: UpdateMedicalRecordDto): Promise<MedicalRecordEntity> {
        return this.repository.updateById(updateMedicalRecordDto);
    }

}