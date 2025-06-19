import { UpdateAppointmentDto } from "../../dtos";
import { AppointmentEntity } from "../../entities/appointment.entity";
import { AppointmentRepository } from "../../repositories/appointment.repository";

export interface DeleteAppointmentUseCase {
  execute( id: string ): Promise<AppointmentEntity>
}


export class DeleteAppointment implements DeleteAppointmentUseCase {
  
  constructor(
    private readonly repository: AppointmentRepository,
  ) {}
  
  execute( id: string ): Promise<AppointmentEntity> {
    return this.repository.deleteAppointment(id);
  }

}

