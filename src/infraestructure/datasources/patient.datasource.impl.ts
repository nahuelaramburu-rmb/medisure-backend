import { create } from "domain";
import { prisma } from "../../data/postgres";
import { CreatePatientDto, CustomError, PaginationDto, PatientDataSource, PatientEntity, UpdatePatientDto, UserEntity } from "../../domain";


export class PatientDataSourceImpl implements PatientDataSource {


    async createPatient(createPatientDto: CreatePatientDto, userEntity: UserEntity): Promise<PatientEntity> {
        try {
            const patient = await prisma.patients.create({
                data: {
                    medical_record_number: createPatientDto.medical_record_number,
                    first_name: createPatientDto.first_name,
                    last_name: createPatientDto.last_name,
                    date_of_birth: createPatientDto.date_of_birth,
                    gender: createPatientDto.gender,
                    phone: createPatientDto.phone,
                    email: createPatientDto.email,
                    blood_type: createPatientDto.blood_type,
                    emergency_contact_name: createPatientDto.emergency_contact_name,
                    emergency_contact_phone: createPatientDto.emergency_contact_phone,
                    primary_doctor_id: createPatientDto.primary_doctor_id,
                    created_by_user_id: userEntity.id,
                }
            });
            return PatientEntity.fromObject(patient);
        } catch (error) {
            throw new CustomError(500, 'Error creating patient');
        }
    }

    async getAllPatients(paginationDto: PaginationDto): Promise<PatientEntity[]> {
        const { page, limit } = paginationDto;
        try {
            const patients = await prisma.patients.findMany(
                {
                    orderBy: { created_at: 'desc' },
                    skip: (page - 1) * limit,
                    take: limit,    
                });

            return patients.map(patient => PatientEntity.fromObject(patient));

        } catch (error) {
            throw new CustomError(500, 'Error fetching patients');
         }
    }
    async getPatientById(id: string): Promise<PatientEntity> {

        const patient = await prisma.patients.findUnique({
            where: { id }
        });

        if (!patient) throw new CustomError(404, "Patient not found");

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

    async getPatientsByDateRange(startDate?: Date, endDate?: Date): Promise<PatientEntity[]> {
        const whereClasuse: any = {};
        if (startDate) {
            whereClasuse.created_at = { gte: startDate };
        }
        if (endDate) {
            whereClasuse.created_at = { ...whereClasuse.created_at, lte: endDate };
        }
        const patients = await prisma.patients.findMany({
            where: whereClasuse,
            orderBy: { created_at: 'desc' }
        });
        return patients.map(patient => PatientEntity.fromObject(patient));
    }

}