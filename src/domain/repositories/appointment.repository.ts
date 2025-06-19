import { AppointmentEntity, CreateAppointmentDto, UpdateAppointmentDto } from "..";


export abstract class AppointmentRepository {
    abstract getAllAppointments(): Promise<AppointmentEntity[]>;
    abstract getAppointmentById(id: string): Promise<AppointmentEntity>;
    abstract createAppointment(createAppointmentDto: CreateAppointmentDto): Promise<AppointmentEntity>;
    abstract updateAppointment(updateAppointmentDto: UpdateAppointmentDto): Promise<AppointmentEntity>;
    abstract deleteAppointment(id: string): Promise<AppointmentEntity>;
}