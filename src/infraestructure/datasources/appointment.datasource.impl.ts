import { prisma } from "../../data/postgres";
import { AppointmentDatasource, AppointmentEntity, CreateAppointmentDto, CustomError, UpdateAppointmentDto } from "../../domain";


export class AppointmentDatasourceImpl implements AppointmentDatasource{


    async getAllAppointments(): Promise<AppointmentEntity[]> {
        const appointments = await prisma.appointments.findMany();
        return appointments.map(appointment => AppointmentEntity.fromObject(appointment));
    }
    async getAppointmentById(id: string): Promise<AppointmentEntity> {
        const appointment = await prisma.appointments.findUnique({
            where: { id }
        });
        if ( !appointment ) throw new CustomError(404, `Appointment not found with id: ${id}`);
        return AppointmentEntity.fromObject(appointment);
    }
    async createAppointment(createAppointmentDto: CreateAppointmentDto): Promise<AppointmentEntity> {
        const appointment = await prisma.appointments.create({
            data: createAppointmentDto!
        });
        return AppointmentEntity.fromObject(appointment);
    }
    async updateAppointment(updateAppointmentDto: UpdateAppointmentDto): Promise<AppointmentEntity> {
        await this.getAppointmentById(updateAppointmentDto.id);
        const updatedAppointment = await prisma.appointments.update({
            where: { id: updateAppointmentDto.id },
            data: updateAppointmentDto!.values
        })
        return AppointmentEntity.fromObject(updatedAppointment);
    }
    async deleteAppointment(id: string): Promise<AppointmentEntity> {
        await this.getAppointmentById(id);
        const deletedAppointment = prisma.appointments.delete({
            where: { id }
        });
        return AppointmentEntity.fromObject(deletedAppointment);
    }

}