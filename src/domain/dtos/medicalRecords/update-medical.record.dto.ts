import { Validators } from "../../../config";
import { RecordType } from "../../enums";


export class UpdateMedicalRecordDto {
     constructor(
        public id:string,
        public patient_id?: string,
        public record_type?: RecordType,
        public record_date?: Date,
        public data?: object,
        public created_by_user_id?: string,
        public document_id?: string,
        public verified_by_user_id? :string,
        public confidence_score?: number,
        public verified_at ?: Date,
    ) { }

    get values (){

        const returnObj: { [key: string]: any } = {};
        if (this.id) returnObj.id = this.id;
        if (this.patient_id) returnObj.patient_id = this.patient_id;
        if (this.record_type) returnObj.record_type = this.record_type;
        if (this.record_date) returnObj.record_date = this.record_date; 
        if (this.data) returnObj.data = this.data;
        if (this.created_by_user_id) returnObj.created_by_user_id = this.created_by_user_id;
        if (this.document_id) returnObj.document_id = this.document_id;
        if (this.verified_by_user_id) returnObj.verified_by_user_id = this.verified_by_user_id;
        if (this.confidence_score) returnObj.confidence_score = this.confidence_score;
        if (this.verified_at) returnObj.verified_at = this.verified_at;

        return returnObj;
    }

    static create(object: { [key: string]: any }): [string?,UpdateMedicalRecordDto?] {
        const {
            id,
            patient_id,
            record_type,
            record_date,
            data,
            created_by_user_id,
            document_id,
            verified_by_user_id,
            confidence_score,
            verified_at
        } = object;

        if ( patient_id && !Validators.uuid.test(patient_id) ) return ['patient_id must be a valid UUID'];
        if ( record_type && !Object.values(RecordType).includes(record_type) ) return ['Invalid record_type value'];
        if ( record_date && !Validators.date.test(record_date) ) return ['record_date must be a valid date'];
        if ( data && typeof data !== 'object' ) return ['data must be a valid object'];
        if ( created_by_user_id && !Validators.uuid.test(created_by_user_id) ) return ['created_by_user_id must be a valid UUID'];
        if ( document_id && !Validators.uuid.test(document_id) ) return ['document_id must be a valid UUID'];
        if ( verified_by_user_id && !Validators.uuid.test(verified_by_user_id) ) return ['verified_by_user_id must be a valid UUID'];
        if ( confidence_score && (typeof confidence_score !== 'number' || confidence_score < 0 || confidence_score > 2) ) {
            return ['confidence_score must be a number between 0 and 2'];
        }

        return [
            undefined, 
            new UpdateMedicalRecordDto(
                id,
                patient_id,
                record_type,
                record_date,
                data,
                created_by_user_id,
                document_id,
                verified_by_user_id,
                confidence_score,
                verified_at
            )
        ]
    }
}