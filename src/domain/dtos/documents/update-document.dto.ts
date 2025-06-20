import { DocumentFileType, DocumentStatusValidType, DocumentType} from "../..";
import { Validators } from "../../../config";



export class UpdateDocumentDto{
    private constructor(
        //TODO: patiend_id should be optional if the document is not associated with a patient
        // but this is not the case for now, so we keep it mandatory
        public id: string,
        public patient_id: string,
        public document_id: string,
        public document_type?: DocumentType,
        public uploaded_by_user_id?: string,
        public filename?: string,
        public file_type?: DocumentFileType,
        public file_size?: number | bigint,
        public storage_path?: string,
        public processing_status?: DocumentStatusValidType,
        public processed_at?: Date,
    ){}

    get values(){
        const returnObj: { [key: string]: any } = {};
        if (this.id) returnObj.id = this.id;
        if (this.patient_id) returnObj.patient_id = this.patient_id;
        if (this.document_id) returnObj.document_id = this.document_id;
        if (this.document_type) returnObj.document_type = this.document_type;
        if (this.uploaded_by_user_id) returnObj.uploaded_by_user = this.uploaded_by_user_id;
        if (this.filename) returnObj.filename = this.filename;
        if (this.file_type) returnObj.file_type = this.file_type;
        if (this.file_size !== undefined && this.file_size !== null) returnObj.file_size = this.file_size;
        if (this.storage_path) returnObj.storage_path = this.storage_path;
        if (this.processing_status) returnObj.processing_status = this.processing_status;
        if (this.processed_at) returnObj.processed_at = this.processed_at;

        return returnObj;
    }
    static create(object: { [key: string]: any }): [string?, UpdateDocumentDto?] {
        const {
            id,
            patient_id,
            document_id,
            document_type,
            uploaded_by_user_id,
            filename,
            file_type,
            file_size,
            storage_path,
            processing_status,
            processed_at
        } = object;

        if (!id) return ['Missing id'];
        if (!patient_id) return ['Missing patient_id'];
        if (!document_id) return ['Missing document_id'];

        if (!Validators.uuid.test(id)) return ['id must be a valid UUID'];
        if (!Validators.uuid.test(patient_id)) return ['patient_id must be a valid UUID'];
        if (!Validators.uuid.test(document_id)) return ['document_id must be a valid UUID'];
        if (document_type && !Object.values(DocumentType).includes(document_type)) return ['Invalid document_type value'];
        if (uploaded_by_user_id && !Validators.uuid.test(uploaded_by_user_id)) return ['uploaded_by_user must be a valid UUID'];
        if (filename && (typeof filename !== 'string' || filename.trim() === '')) return ['filename must be a non-empty string'];
        if (file_type && !Object.values(DocumentFileType).includes(file_type)) return ['Invalid file_type value'];
        if (file_size !== undefined && file_size !== null && (file_size < 0 || (typeof file_size !== 'number' && typeof file_size !== 'bigint'))) {
            return ['file_size must be a positive number or bigint'];
        }
        if (storage_path && (typeof storage_path !== 'string' || storage_path.trim() === '')) return ['storage_path must be a non-empty string'];
        if (processing_status && !Object.values(DocumentStatusValidType).includes(processing_status)) {
            return ['Invalid processing_status value'];
        }

        let newProcessedAt;
        if (processed_at) {
            if (!Validators.date.test(processed_at)) return ['processed_at must be a valid date'];
            newProcessedAt = new Date(processed_at);
            if (isNaN(newProcessedAt.getTime())) return ['processed_at must be a valid date'];
        }

        return [
            undefined,
            new UpdateDocumentDto(
                id,
                patient_id,
                document_id,
                document_type,
                uploaded_by_user_id,
                filename,
                file_type,
                file_size,
                storage_path,
                processing_status,
                newProcessedAt
            )
        ];
    }
}