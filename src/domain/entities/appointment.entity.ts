import { AppointmentStatusType, AppointmentType } from "..";


export class AppointmentEntity{
    constructor(
        public id: string, 
        public patient_id: string,
        public doctor_id:string,
        public appointment_type: AppointmentType,
        public scheduled_at: Date,
        public duration_minutes: number,
        public status: AppointmentStatusType,
        public created_by_user_id: string,
        public chief_complaint?: string,
        public notes?: string,

    ){
        this.duration_minutes = duration_minutes || 30; 
        this.status = status || AppointmentStatusType.Scheduled;
    }
    static fromObject(object: { [key: string]: any }): AppointmentEntity {
        const {
            id,
            patient_id,
            doctor_id,
            appointment_type,
            scheduled_at,
            duration_minutes,
            status,
            created_by_user_id,
            chief_complaint,
            notes
        } = object;

        if ( !Object.values(AppointmentType).includes(appointment_type)) throw new Error('Invalid appointment_type value');
        if ( !Object.values(AppointmentStatusType).includes(status)) throw new Error('Invalid status value');
        if ( duration_minutes < 1 && duration_minutes > 480 ) throw new Error('duration_minutes must be between 1 and 480 minutes');
        
        return new AppointmentEntity(
            id,
            patient_id,
            doctor_id,
            appointment_type,
            scheduled_at,
            duration_minutes,
            status,
            created_by_user_id,
            chief_complaint,
            notes
        );
        return new AppointmentEntity(
            id,
            patient_id,
            doctor_id,
            appointment_type,
            scheduled_at,
            duration_minutes,
            status,
            created_by_user_id,
            chief_complaint,
            notes
        );
    }
}