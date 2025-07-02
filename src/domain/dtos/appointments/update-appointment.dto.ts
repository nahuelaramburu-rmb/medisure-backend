import { AppointmentStatusType, AppointmentType } from "../..";
import { Validators } from "../../../config";


export class UpdateAppointmentDto {
    private constructor(
        public id: string,
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

    get values(){
        const returnObj: { [key: string]: any } = {};
        if (this.id) returnObj.id = this.id;
        if (this.patient_id) returnObj.patient_id = this.patient_id;
        if (this.doctor_id) returnObj.doctor_id = this.doctor_id;
        if (this.appointment_type) returnObj.appointment_type = this.appointment_type;
        if (this.scheduled_at) returnObj.scheduled_at = this.scheduled_at;
        if (this.duration_minutes) returnObj.duration_minutes = this.duration_minutes;
        if (this.status) returnObj.status = this.status;
        if (this.created_by_user_id) returnObj.created_by_user_id = this.created_by_user_id;
        if (this.chief_complaint) returnObj.chief_complaint = this.chief_complaint;
        if (this.notes) returnObj.notes = this.notes;

        return returnObj;   
    }

    static create(object: { [key: string]: any }): [string?, UpdateAppointmentDto?] {
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
            new UpdateAppointmentDto(
                id,
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
