import { create } from "domain";
import { prisma } from "../../data/postgres";
import { CreatePatientDto, CustomError, PatientDataSource, PatientEntity, UpdatePatientDto } from "../../domain";


export class PatientDataSourceImpl implements PatientDataSource {
    
    
    async createPatient(createPatientDto: CreatePatientDto): Promise<PatientEntity> {

        const patient = await prisma.patients.create({
            data: createPatientDto!
        });
        return PatientEntity.fromObject(patient);
    }

    async getAllPatients(): Promise<PatientEntity[]> {
        
        const patients = await prisma.patients.findMany();
        
        return patients.map(patient => PatientEntity.fromObject(patient));
    }
    async getPatientById(id: string): Promise<PatientEntity> {
        
        const patient = await prisma.patients.findUnique({
            where: { id }
        });

        if ( !patient ) throw new CustomError(404,"Patient not found");

        return PatientEntity.fromObject(patient);
    }
    async updatePatient(updatePatientDto: UpdatePatientDto): Promise<PatientEntity> {
        await this.getPatientById(updatePatientDto.id);

        const updatedPatient = await prisma.patients.update({
            where: { id: updatePatientDto.id },
            data: updatePatientDto!.values
        })
        return PatientEntity.fromObject(updatedPatient);
    }
    async deletePatient(id: string): Promise<PatientEntity> {
        await this.getPatientById(id);
        const deletedPatient = await prisma.patients.delete({
            where: { id }
        });
        return PatientEntity.fromObject(deletedPatient);
    }
    
    async getPatientByMedicalRecordNumber(medical_record_number: string): Promise<PatientEntity> {
        const patient = await prisma.patients.findUnique({
            where: { medical_record_number }
        });
        if (!patient) throw new CustomError(404, "Patient not found");
        return PatientEntity.fromObject(patient);
    }

    async existMedicalRecordNumber(medical_record_number: string): Promise<boolean> {
        return prisma.patients.findUnique({
            where: { medical_record_number }
        }).then(patient => !!patient);
    }   

}