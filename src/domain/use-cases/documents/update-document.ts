import { DocumentEntity, DocumentRepository, UpdateDocumentDto } from "../..";



export interface UpdateDocumentsUseCase{
    execute( dto: UpdateDocumentDto): Promise<DocumentEntity>,
}

export class UpdateDocument implements UpdateDocumentsUseCase{
    constructor(
        private readonly repository: DocumentRepository,
    ){}
    execute(dto: UpdateDocumentDto): Promise<DocumentEntity> {
        return this.repository.updateDocument(dto);
    }
}