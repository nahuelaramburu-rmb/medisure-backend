import { DocumentEntity, DocumentRepository } from "../..";




export interface GetDocumentByIdUseCase{
    execute(id: string): Promise<DocumentEntity>,
}
export class GetDocumentById implements GetDocumentByIdUseCase{
    constructor(
        private readonly repository: DocumentRepository,
    ){}
    execute(id:string): Promise<DocumentEntity> {
        return this.repository.getDocumentById(id);
    }
}