import { Router } from "express";
import { DocumentDataSourceImpl } from "../../infraestructure/datasources/document.datasource.impl";
import { DocumentRepositoryImpl } from "../../infraestructure/repositories/document.repository.impl";
import { DocumentController } from "./controller";




export class DocumentRoutes {
    static get routes(): Router{
        const router = Router();
        const datasource = new DocumentDataSourceImpl();
        const repository = new DocumentRepositoryImpl(datasource);
        const documentController = new DocumentController (repository);

        router.get('/', documentController.GetDocuments);
        router.get('/:id', documentController.GetDocumentById);
        router.post('/create', (req, res)=>{
            documentController.CreateDocument(req, res);
        });
        router.put('/:id', (req, res) => {
            documentController.UpdateDocument(req, res);
        });
        router.delete('/:id', documentController.DeleteDocument);
        
        return router;
    }
}