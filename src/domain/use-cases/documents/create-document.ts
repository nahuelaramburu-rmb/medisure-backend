import { CreateDocumentDto, DocumentRepository } from "../..";
import { DocumentEntity } from "../../entities/document.entity";



export interface CreateDocumentUseCase {
    execute(dto: CreateDocumentDto): Promise<DocumentEntity>;  
}

export class CreateDocument implements CreateDocumentUseCase {
    constructor(
        private readonly repository: DocumentRepository,
    ) {}

    async execute(dto: CreateDocumentDto): Promise<DocumentEntity> {
        return this.repository.createDocument(dto);
        
    }
}