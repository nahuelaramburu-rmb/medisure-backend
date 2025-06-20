import { CreateDocumentDto, DocumentDataSource, DocumentEntity, UpdateDocumentDto } from "../../domain";


export class DocumentRepositoryImpl implements DocumentDataSource{
    constructor(
        private readonly datasource: DocumentDataSource
    ){}
    getAllDocuments(): Promise<DocumentEntity[]> {
        return this.datasource.getAllDocuments();
    }
    getDocumentById(id: string): Promise<DocumentEntity> {
        return this.datasource.getDocumentById(id);
    }
    createDocument(createDocumentDto: CreateDocumentDto): Promise<DocumentEntity> {
        return this.datasource.createDocument(createDocumentDto);
    }
    updateDocument(updateDocumentDto: UpdateDocumentDto): Promise<DocumentEntity> {
        return this.datasource.updateDocument(updateDocumentDto);
    }
    deleteDocument(id: string): Promise<DocumentEntity> {
        return this.datasource.deleteDocument(id);
    }

}