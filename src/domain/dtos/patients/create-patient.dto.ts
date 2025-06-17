import { BloodType, Gender } from "../../enums";


export class CreatePatientDto{
    private constructor(
        public medical_record_number: string,
        public first_name: string, 
        public last_name: string,
        public date_of_birth: Date,
        public gender: Gender,
        public blood_type: BloodType,
        public created_by_user_id: string,
        public primary_doctor_id: string,
        public phone?: string,
        public email?: string,
        public emergency_contact_name?: string,
        public emergency_contact_phone?: string,
    ){}

    static create(object: {[key:string]: any}): [string?, CreatePatientDto?] {
        const {
            medical_record_number,
            first_name,
            last_name,
            date_of_birth,
            created_by_user_id,
            primary_doctor_id,
            gender,
            phone,
            email,
            blood_type,
            emergency_contact_name,
            emergency_contact_phone,
        } = object;
        if (!medical_record_number) return ['Missing medical_record_number'];
        if ( !first_name) return ['Missing first_name'];
        if ( !last_name) return ['Missing last_name'];
        if ( !date_of_birth) return ['Missing date_of_birth'];
        if( !gender ) return ['Missing gender'];
        if ( !blood_type ) return ['Missing blood_type'];

        if( !primary_doctor_id ) return ['Missing primary_doctor_id'];
        if( !created_by_user_id ) return ['Missing created_by_user_id'];

        if ( typeof medical_record_number !== 'string' ) return ['medical_records must be a string'];
        if ( typeof first_name !== 'string' ) return ['first_name must be a string'];
        if ( typeof last_name !== 'string' ) return ['last_name must be a string'];
        if ( typeof created_by_user_id !== 'string' ) return ['created_by_user_id must be a string'];
        if ( !Object.values(Gender).includes(gender)) return['Invalid gender value'];
        if ( !Object.values(BloodType).includes(blood_type)) return ['Invalid blood_type value'];
       

        return [
            undefined,
            new CreatePatientDto(
            medical_record_number,
            first_name,
            last_name,
            date_of_birth,
            gender,
            blood_type,
            created_by_user_id,
            primary_doctor_id,
            phone,
            email,
            emergency_contact_name,
            emergency_contact_phone,
            )
        ];
    }
}