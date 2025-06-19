import { UpdateAppointmentDto } from "../../dtos";
import { AppointmentEntity } from "../../entities/appointment.entity";
import { AppointmentRepository } from "../../repositories/appointment.repository";

export interface UpdateAppointmentUseCase {
  execute( dto: UpdateAppointmentDto ): Promise<AppointmentEntity>
}


export class UpdateAppointment implements UpdateAppointmentUseCase {
  
  constructor(
    private readonly repository: AppointmentRepository,
  ) {}
  
  execute( dto: UpdateAppointmentDto ): Promise<AppointmentEntity> {
    return this.repository.updateAppointment(dto);
  }

}

