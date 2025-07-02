import { DocumentFileType, DocumentStatusValidType, DocumentType } from "../enums";


export class DocumentEntity{
    constructor(
        public id:string,
        public patient_id:string,
        public document_type: DocumentType, 
        public uploaded_by_user_id: string,
        public filename: string, 
        public file_type: DocumentFileType, 
        public file_size: string,
        public storage_path: string, 
        public processing_status: DocumentStatusValidType,
        public processed_at?: Date,
    ){}

    static fromObject(object: { [key: string]: any }): DocumentEntity {
        const {
            id,
            patient_id,
            document_type,
            uploaded_by_user_id,
            filename,
            file_type,
            file_size,
            storage_path,
            processing_status,
            processed_at
        } = object;

        if (!patient_id) throw  new Error('Missing patient_id');
        if (!document_type) throw new Error('Missing document_type');
        if (!uploaded_by_user_id) throw new Error('Missing uploaded_by_user_id');
        if (!filename) throw new Error('Missing filename');
        if (!file_type) throw new Error('Missing file_type');
        if (file_size === undefined || file_size === null) throw new Error('Missing file_size');
        if (!storage_path) throw new Error('Missing storage_path');
        if (!processing_status) throw new Error('Missing processing_status');

        if (!Object.values(DocumentType).includes(document_type)) throw new Error('Invalid document_type value');
        if (!Object.values(DocumentFileType).includes(file_type)) throw new Error('Invalid file_type value');
        if (!Object.values(DocumentStatusValidType).includes(processing_status)) throw new Error('Invalid processing_status value');
        let newProcessedAt;
        if (processed_at) {
            newProcessedAt = new Date(processed_at);
            if (isNaN(newProcessedAt.getTime())) throw new Error('processed_at must be a valid date');
        }

        // Conversión segura de file_size
        let safeFileSize: string;
        if (typeof file_size === 'bigint') {
            safeFileSize = file_size.toString();
        } else if (typeof file_size === 'number') {
            safeFileSize = file_size.toString();
        } else {
            safeFileSize = String(file_size);
        }

        return new DocumentEntity(
            id,
            patient_id,
            document_type,
            uploaded_by_user_id,
            filename,
            file_type,
            safeFileSize,
            storage_path,
            processing_status,
            newProcessedAt
        )
    }

}