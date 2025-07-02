import { prisma } from "../../data/postgres";
import { CreateDocumentDto, CustomError, DocumentDataSource, DocumentEntity, UpdateDocumentDto } from "../../domain";


export class DocumentDataSourceImpl implements DocumentDataSource{
    async getAllDocuments(): Promise<DocumentEntity[]> {
        const documents = await prisma.documents.findMany();
        return documents.map(document => DocumentEntity.fromObject(document));
    }

    async getDocumentById(id: string): Promise<DocumentEntity> {
        const document = await prisma.documents.findUnique({
            where: { id }
        });
        if (!document) throw new CustomError(404, `Document not found with id: ${id}`);
        return DocumentEntity.fromObject(document);
    }

    async createDocument(createDocumentDto: CreateDocumentDto): Promise<DocumentEntity> {
        
        const document = await prisma.documents.create({
            data: 
                createDocumentDto!
            
        });
        return DocumentEntity.fromObject(document);
    }

    async updateDocument(updateDocumentDto: UpdateDocumentDto): Promise<DocumentEntity> {
        await this.getDocumentById(updateDocumentDto.id);
        const updatedDocument = await prisma.documents.update({
            where: { id: updateDocumentDto.id },
            data: updateDocumentDto.toPrismaUpdateInput()
        });
        return DocumentEntity.fromObject(updatedDocument);
    }

    async deleteDocument(id: string): Promise<DocumentEntity> {
        await this.getDocumentById(id);
        const deletedDocument = await prisma.documents.delete({
            where: { id }
        });
        return DocumentEntity.fromObject(deletedDocument);
    }

}