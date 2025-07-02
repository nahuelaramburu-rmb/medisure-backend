import { DocumentFileType, DocumentStatusValidType, DocumentType } from "../..";
import { Validators } from "../../../config";


export class CreateDocumentDto {
    private constructor(
        public patient_id: string,
        public document_type: DocumentType,
        public uploaded_by_user_id: string,
        public filename: string,
        public file_type: DocumentFileType,
        public file_size: number|bigint,
        public storage_path: string,
        public processing_status: DocumentStatusValidType,
        public processed_at?: Date,
    ) { }

    static create(object: { [key: string]: any }): [string?, CreateDocumentDto?] {
        const {
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

        if (!patient_id) return ['Missing patient_id'];
        if (!document_type) return ['Missing document_type'];
        if (!uploaded_by_user_id) return ['Missing uploaded_by_user'];
        if (!filename) return ['Missing filename'];
        if (!file_type) return ['Missing file_type'];
        if (file_size === undefined || file_size === null) return ['Missing file_size'];
        if (!storage_path) return ['Missing storage_path'];
        if (!processing_status) return ['Missing processing_status'];

        if (!Validators.uuid.test(patient_id)) return ['patient_id must be a valid UUID'];
        if (!Object.values(DocumentType).includes(document_type)) return ['Invalid document_type value'];
        if (!Validators.uuid.test(uploaded_by_user_id)) return ['uploaded_by_user must be a valid UUID'];
        if (typeof filename !== 'string' || filename.trim() === '') return ['filename must be a non-empty string'];
        if (!Object.values(DocumentFileType).includes(file_type)) return ['Invalid file_type value'];
        if (file_size < 0 || (typeof file_size !== 'number' && typeof file_size !== 'bigint')) {
            return ['file_size must be a positive number or bigint'];
        }
        if (typeof storage_path !== 'string' || storage_path.trim() === '') return ['storage_path must be a non-empty string'];
        if (!Object.values(DocumentStatusValidType).includes(processing_status)) {
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
            new CreateDocumentDto(
                patient_id,
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