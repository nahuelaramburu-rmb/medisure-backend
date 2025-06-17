import { AppointmentStatusType, AppointmentType } from "../..";
import { Validators } from "../../../config";


export class CreateAppointmentDto {
    private constructor(
        public patient_id: string,
        public doctor_id: string,
        public appointment_type: AppointmentType,
        public scheduled_at: Date,
        public duration_minutes: number,
        public status: AppointmentStatusType,
        public created_by_user_id: string,
        public chief_complaint?: string,
        public notes?: string,
    ) { }

    static create(object: { [key: string]: any }): [string?, CreateAppointmentDto?] {
        const {
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

        if ( !patient_id ) return ['Missing patient_id'];
        if ( !doctor_id ) return ['Missing doctor_id'];
        if ( !appointment_type ) return ['Missing appointment_type'];
        if ( !scheduled_at ) return ['Missing scheduled_at'];
        if ( !duration_minutes ) return ['Missing duration_minutes'];
        if ( !status ) return ['Missing status'];
        if (!created_by_user_id) return ['Missing created_by_user_id'];
        
        if ( !Validators.uuid.test(patient_id)) return ['Invalid patient_id format'];
        if ( !Validators.uuid.test(doctor_id)) return ['Invalid doctor_id format'];
        if ( !Validators.date.test(scheduled_at)) return ['scheduled_at must be a valid date'];
        if ( typeof duration_minutes !== 'number' || duration_minutes < 1 || duration_minutes > 480 )
            return ['duration_minutes must be a number between 1 and 480'];
        if ( !Object.values(AppointmentType).includes(appointment_type)) return ['Invalid appointment_type value'];
        if ( !Object.values(AppointmentStatusType).includes(status)) return ['Invalid status value'];
        if ( !Validators.uuid.test(created_by_user_id)) return ['created_by_user_id must be a valid UUID'];
        

        return [
            undefined, 
            new CreateAppointmentDto(
                patient_id,
                doctor_id,
                appointment_type,
                scheduled_at,
                duration_minutes,
                status,
                created_by_user_id, 
                chief_complaint,
                notes,
            )
        ]
    }
}
