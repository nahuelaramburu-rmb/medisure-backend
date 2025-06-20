import { Validators } from "../../../config";
import { RecordType } from "../../enums";


export class CreateMedicalRecordDto {
    private constructor(
        public patient_id: string,
        public record_type: RecordType,
        public record_date: Date,
        public data: object,
        public created_by_user_id: string,
        public document_id?: string,
        public verified_by_user_id? :string,
        public confidence_score?: number,
        public verified_at ?: Date,
    ) { }

    static create(object: { [key: string]: any }): [string?,CreateMedicalRecordDto?] {
        const {
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
        if  ( !patient_id ) return ['Missing patient_id'];
        if  ( !record_type ) return ['Missing record_type'];
        if  ( !record_date ) return ['Missing record_date'];
        if  ( !data ) return ['Missing data'];
        if  ( !created_by_user_id ) return ['Missing created_by_user_id'];

        if ( !Validators.uuid.test(patient_id) ) return ['patient_id must be a valid UUID'];
        if ( !Object.values(RecordType).includes(record_type) ) return ['Invalid record_type value'];
        if ( !Validators.date.test(record_date) ) return ['record_date must be a valid date'];
        if ( typeof data !== 'object' ) return ['data must be a valid object'];
        if ( !Validators.uuid.test(created_by_user_id) ) return ['created_by_user_id must be a valid UUID'];
        if ( document_id && !Validators.uuid.test(document_id) ) return ['document_id must be a valid UUID'];
        if ( verified_by_user_id && !Validators.uuid.test(verified_by_user_id) ) return ['verified_by_user_id must be a valid UUID'];
        if ( confidence_score && (typeof confidence_score !== 'number' || confidence_score < 0 || confidence_score > 2) ) {
            return ['confidence_score must be a number between 0 and 2'];
        }

        return [
            undefined, 
            new CreateMedicalRecordDto(
                patient_id,
                record_type,
                record_date,
                data,
                created_by_user_id,
                document_id,
                verified_by_user_id,
                confidence_score,
                verified_at ? new Date(verified_at) : undefined
            )
        ]
    }
}