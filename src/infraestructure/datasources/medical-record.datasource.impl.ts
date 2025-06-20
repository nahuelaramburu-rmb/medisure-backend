import { prisma } from "../../data/postgres";
import { CreateMedicalRecordDto, CustomError, MedicalRecordDataSource, MedicalRecordEntity, UpdateMedicalRecordDto } from "../../domain";



export class MedicalRecordDataSourceImpl implements MedicalRecordDataSource{
    async createMedicalRecord(createMedicalRecordDto: CreateMedicalRecordDto): Promise<MedicalRecordEntity> {
        const medical_record = await prisma.medical_records.create({
            data: createMedicalRecordDto!
        })
        return MedicalRecordEntity.fromObject(medical_record);
    }
    async getAllMedicalRecords(): Promise<MedicalRecordEntity[]> {
        const medical_records = await prisma.medical_records.findMany();

        return medical_records.map( medical_record => MedicalRecordEntity.fromObject(medical_record));
    }
    async getMedicalRecordById(id: string): Promise<MedicalRecordEntity> {

        const medical_record = await prisma.medical_records.findUnique({
            where: { id }
        });
        if( !medical_record ) throw new CustomError(404, "Medical record not found");
        return MedicalRecordEntity.fromObject(medical_record);
    }
    async updateMedicalRecord(updateMedicalRecordDto: UpdateMedicalRecordDto): Promise<MedicalRecordEntity> {
        await this.getMedicalRecordById(updateMedicalRecordDto.id);
        const updatedMedicalRecord = await prisma.medical_records.update({
            where: { id: updateMedicalRecordDto.id },
            data: updateMedicalRecordDto!.values
        });
        return MedicalRecordEntity.fromObject(updatedMedicalRecord);
    }
    async deleteMedicalRecord(id: string): Promise<MedicalRecordEntity> {
        await this.getMedicalRecordById(id);
        const deletedMedicalRecord = await prisma.medical_records.delete({
            where: { id }
        });
        return MedicalRecordEntity.fromObject(deletedMedicalRecord);
    }
}