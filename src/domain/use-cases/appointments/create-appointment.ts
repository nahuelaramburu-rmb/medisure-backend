import { AppointmentEntity, AppointmentRepository, CreateAppointmentDto } from "../..";



export interface CreateAppointmentUseCase{
    execute(dto: CreateAppointmentDto):Promise<AppointmentEntity>;
}

export class CreateAppointment implements CreateAppointmentUseCase{
    constructor(
        private readonly appointmentRepository: AppointmentRepository
    ){}
    execute(dto : CreateAppointmentDto): Promise<AppointmentEntity> {
        return this.appointmentRepository.createAppointment(dto);
    }
}