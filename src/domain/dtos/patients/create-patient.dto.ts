import { BloodType, Gender } from "../../enums";


export class    CreatePatientDto{
    private constructor(
        public medical_record_number: string,
        public first_name: string, 
        public last_name: string,
        public date_of_birth: Date,
        public gender: Gender,
        public blood_type: BloodType,
        
        public primary_doctor_id: string,
        public phone?: string,
        public email?: string,
        public emergency_contact_name?: string,
        public emergency_contact_phone?: string,
    ){}
    get values(){
        
        const returnObj: {[key:string]: any} = {};
        if ( this.medical_record_number ) returnObj.medical_record_number = this.medical_record_number;
        if ( this.first_name ) returnObj.first_name = this.first_name;
        if ( this.last_name ) returnObj.last_name = this.last_name;
        if ( this.date_of_birth ) returnObj.date_of_birth = this.date_of_birth;
        if ( this.gender ) returnObj.gender = this.gender;
        if ( this.blood_type ) returnObj.blood_type = this.blood_type;
        
        if ( this.primary_doctor_id ) returnObj.primary_doctor_id = this.primary_doctor_id;
        if ( this.phone ) returnObj.phone = this.phone;
        if ( this.email ) returnObj.email = this.email;
        if ( this.emergency_contact_name ) returnObj.emergency_contact_name = this.emergency_contact_name;
        if ( this.emergency_contact_phone ) returnObj.emergency_contact_phone = this.emergency_contact_phone;
        
        return  returnObj;
    }
    static create(object: {[key:string]: any}): [string?, CreatePatientDto?] {
        const {
            medical_record_number,
            first_name,
            last_name,
            date_of_birth,
            
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


        if ( typeof medical_record_number !== 'string' ) return ['medical_records must be a string'];
        if ( typeof first_name !== 'string' ) return ['first_name must be a string'];
        if ( typeof last_name !== 'string' ) return ['last_name must be a string'];
        
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
            
            primary_doctor_id,
            phone,
            email,
            emergency_contact_name,
            emergency_contact_phone,
            )
        ];
    }
}