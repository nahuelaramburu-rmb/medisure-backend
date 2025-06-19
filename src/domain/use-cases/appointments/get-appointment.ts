import { AppointmentEntity, AppointmentRepository } from "../..";


export interface GetAppointmentUseCase{
    execute(id:string):Promise<AppointmentEntity>;
}

export class GetAppointment implements GetAppointmentUseCase{
    constructor(
        private readonly appointmentRepository: AppointmentRepository
    ){}
    execute(id: string): Promise<AppointmentEntity> {
        return this.appointmentRepository.getAppointmentById(id);
    }
}