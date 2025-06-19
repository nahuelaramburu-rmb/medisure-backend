import { AppointmentDatasource, AppointmentEntity, AppointmentRepository, CreateAppointmentDto, UpdateAppointmentDto } from "../../domain";


export class AppointmentRepositoryImpl implements AppointmentRepository{
    constructor(
        private readonly datasource : AppointmentDatasource
    ){}
    getAllAppointments(): Promise<AppointmentEntity[]> {
        return this.datasource.getAllAppointments();
    }
    getAppointmentById(id: string): Promise<AppointmentEntity> {
        return this.datasource.getAppointmentById(id);
    }
    createAppointment(createAppointmentDto: CreateAppointmentDto): Promise<AppointmentEntity> {
        return this.datasource.createAppointment(createAppointmentDto);
    }
    updateAppointment(updateAppointmentDto: UpdateAppointmentDto): Promise<AppointmentEntity> {
        return this.datasource.updateAppointment(updateAppointmentDto);
    }
    deleteAppointment(id: string): Promise<AppointmentEntity> {
        return this.datasource.deleteAppointment(id);
    }

}