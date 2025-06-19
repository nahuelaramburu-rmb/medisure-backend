import { AppointmentEntity, AppointmentRepository } from "../..";


export interface GetAppointmentsUseCase{
    execute():Promise<AppointmentEntity[]>;
}

export class GetAppointments implements GetAppointmentsUseCase{
    constructor(
        private readonly appointmentRepository: AppointmentRepository
    ){}
    execute(): Promise<AppointmentEntity[]> {
        return this.appointmentRepository.getAllAppointments();
    }
}