import { CreateDocumentDto, DocumentEntity, UpdateDocumentDto } from "..";


export abstract class DocumentDataSource {
    abstract getAllDocuments(): Promise<DocumentEntity[]>;
    abstract getDocumentById(id: string): Promise<DocumentEntity>;
    abstract createDocument(createDocumentDto: CreateDocumentDto): Promise<DocumentEntity>;
    abstract updateDocument(updateDocumentDto: UpdateDocumentDto): Promise<DocumentEntity>;
    abstract deleteDocument(id: string): Promise<DocumentEntity>;
}