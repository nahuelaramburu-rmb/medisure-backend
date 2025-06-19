import { AppointmentEntity, CreateAppointmentDto } from "..";

export abstract class AppointmentDatasource{
    abstract getAllAppointments():Promise<AppointmentEntity[]>;
    abstract getAppointmentById(id: string):Promise<AppointmentEntity>;
    abstract createAppointment(createAppointmentDto: CreateAppointmentDto):Promise<AppointmentEntity>;
    abstract updateAppointment(updateAppointmentDto: CreateAppointmentDto):Promise<AppointmentEntity>;
    abstract deleteAppointment(id: string):Promise<AppointmentEntity>;

}