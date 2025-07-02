import { DocumentEntity } from "../../entities/document.entity";
import { DocumentRepository } from "../../repositories/document.repository";



export interface DeleteDocumentUseCase{
    execute(id: string): Promise<DocumentEntity>;
}

export class DeleteDocument implements DeleteDocumentUseCase{
    constructor(
        private readonly repository: DocumentRepository,
    ){}
    execute(id: string): Promise<DocumentEntity> {
        return this.repository.deleteDocument(id);
    }

}