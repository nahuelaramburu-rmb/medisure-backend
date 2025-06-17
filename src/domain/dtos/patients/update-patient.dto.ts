import { BloodType, Gender } from "../../enums";

export class UpdatePatientDto{
    private constructor(
        public id:string, 
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

    get values(){
        
        const returnObj: {[key:string]: any} = {};
        if ( this.medical_record_number ) returnObj.medical_record_number = this.medical_record_number;
        if ( this.first_name ) returnObj.first_name = this.first_name;
        if ( this.last_name ) returnObj.last_name = this.last_name;
        if ( this.date_of_birth ) returnObj.date_of_birth = this.date_of_birth;
        if ( this.phone ) returnObj.phone = this.phone;
        if ( this.email ) returnObj.email = this.email;
        if ( this.blood_type ) returnObj.blood_type = this.blood_type;
        if ( this.emergency_contact_name ) returnObj.emergency_contact_name = this.emergency_contact_name;
        if ( this.emergency_contact_phone ) returnObj.emergency_contact_phone = this.emergency_contact_phone;
        if ( this.primary_doctor_id ) returnObj.primary_doctor_id = this.primary_doctor_id;
        
        return  returnObj;
    }

    static create(object: {[key:string]: any}): [string?, UpdatePatientDto?] {
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
        } = object;

        
        if ( typeof medical_record_number !== 'string' ) return ['medical_records must be a string'];
        if ( typeof first_name !== 'string' ) return ['first_name must be a string'];
        if ( typeof last_name !== 'string' ) return ['last_name must be a string'];
        

        return [
            undefined,
            new UpdatePatientDto(
                id,
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