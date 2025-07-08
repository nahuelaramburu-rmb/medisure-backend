import { BloodType, Gender } from "../enums";
import { create } from 'domain';

export class PatientEntity {
    constructor(
        public id:string,
        public medical_record_number: string,
        public first_name: string, 
        public last_name: string,
        public date_of_birth: Date,
        public created_by_user_id: string,
        public primary_doctor_id: string,
        public gender: Gender,
        public phone?: string,
        public email?: string,
        public blood_type?: BloodType,
        public emergency_contact_name?: string,
        public emergency_contact_phone?: string,
        public created_at?: Date,
        public updated_at?: Date,
    ){}
    public static fromObject( object: { [key: string]: any }): PatientEntity {
        const {
            id,
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
            created_at,
            updated_at,
        } = object;
        
        if (!medical_record_number) throw new Error('Missing medical_record_number');
        if (!first_name) throw new Error('Missing first_name');
        if (!last_name) throw new Error('Missing last_name');
        if (!date_of_birth) throw new Error('Missing date_of_birth');
        if (!created_by_user_id) throw new Error('Missing created_by_user_id');
        if (!primary_doctor_id) throw new Error('Missing primary_doctor_id');
        if (!gender) throw new Error ('Missing gender');

        let newBirthDate;
        const currentDate = new Date();
        if( date_of_birth ){
            newBirthDate = new Date(date_of_birth);
            if (isNaN(newBirthDate.getTime())) throw ['date_of_birth must be a valid date'];
            if (newBirthDate.getTime() >= currentDate.getTime()) throw new Error('date of birth must be earlier than the current date');
        }

        if ( !Object.values(Gender).includes(gender)) throw new Error('Invalid gender value');
        if ( !Object.values(BloodType).includes(blood_type)) throw new Error('Invalid blood_type value');

        return new PatientEntity(
            id,
            medical_record_number, 
            first_name, 
            last_name,
            newBirthDate!,
            created_by_user_id,
            primary_doctor_id,
            gender,
            phone,
            email,
            blood_type,
            emergency_contact_name,
            emergency_contact_phone,
            created_at,
            updated_at
        );
    }
}