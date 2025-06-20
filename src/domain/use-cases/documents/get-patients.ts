import { DocumentEntity } from "../../entities/document.entity";
import { DocumentRepository } from '../../repositories/document.repository';



export interface GetDocumentsUseCase{
    execute(): Promise<DocumentEntity[]>,
}
export class GetDocuments implements GetDocumentsUseCase{
    constructor(
        private readonly repository: DocumentRepository,
    ){}
    execute(): Promise<DocumentEntity[]> {
        return this.repository.getAllDocuments();
    }
}