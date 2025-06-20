import { RecordType } from "../enums";


export class MedicalRecordEntity{
    constructor(
        public patient_id: string,
        public record_type: RecordType,
        public record_date: Date,
        public data: Object,
        public created_by_user_id: string,
        public document_id?: string,
        public verified_by_user_id? :string,
        public confidence_score?: number,
        public verified_at ?: Date,
    ){}

    static fromObject( object:{ [key:string]: any}): MedicalRecordEntity{
        const {
            patient_id,
            document_id,
            record_type,
            record_date,
            data,
            created_by_user_id,
            verified_by_user_id,
            confidence_score,
            verified_at
        } = object;

        if (!patient_id) throw new Error('Missing patient_id');
        if (!record_type) throw new Error('Missing record_type');
        if (!record_date) throw new Error('Missing record_date');
        if (!data) throw new Error('Missing data');
        if (!created_by_user_id) throw new Error('Missing created_by_user_id');

        
        if (!Object.values(RecordType).includes(record_type)) throw new Error('Invalid record_type value');
        let newRecordDate;
        const currentDate = new Date();
        if (record_date) {
            newRecordDate = new Date(record_date);
            if (isNaN(newRecordDate.getTime())) throw new Error('record_date must be a valid date');
            if (newRecordDate.getTime() >= currentDate.getTime()) throw new Error('record_date must be earlier than the current date');
        }
        if (confidence_score && (typeof confidence_score !== 'number' || confidence_score < 0 || confidence_score > 2)) {
            throw new Error('confidence_score must be a number between 0 and 1');
        }

        return new MedicalRecordEntity(
            patient_id,
            document_id,
            record_type,
            newRecordDate!,
            data,
            created_by_user_id,
            verified_by_user_id,
            confidence_score,
            verified_at
        )
    }
}