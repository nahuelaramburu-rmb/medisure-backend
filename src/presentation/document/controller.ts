import { CreateDocumentDto, DocumentRepository, UpdateDocumentDto } from "../../domain";
import { GetDocuments } from '../../domain/use-cases/documents/get-documents';
import { Request, Response } from "express";
import { handleError } from "../helpers/errors";
import { GetDocumentById } from '../../domain/use-cases/documents/get-document';
import { CreateDocument } from '../../domain/use-cases/documents/create-document';
import { UpdateDocument } from '../../domain/use-cases/documents/update-document';
import { DeleteDocument } from '../../domain/use-cases/documents/delete-document';

export class DocumentController{
    constructor(
        private readonly repository: DocumentRepository
    ){}

    GetDocuments = (req: Request, res: Response)=>{
        new GetDocuments(this.repository)
            .execute()
            .then((data)=>{
                res.json({
                    msg:"ok",
                    data: data
                });
            })
            .catch( error=> handleError(error, res) );
    }

    GetDocumentById = (req: Request, res: Response)=>{
        const id = req.params.id;
        new GetDocumentById(this.repository)
            .execute(id)
            .then((document)=>{
                res.json({
                    msg:"ok",
                    data: document
                });
            })
            .catch( error=> handleError(error, res) );
    }

    CreateDocument = async (req: Request, res: Response)=>{
        const [ error, documentDto ] = CreateDocumentDto.create( req.body );

        if( error ) return res.status(400).json({ error });

        new CreateDocument( this.repository )
            .execute( documentDto! )
            .then((data)=>{
                res.json({
                    msg:"ok",
                    data: data
                });
            })
            .catch( error=> handleError(error, res) );
    }

    UpdateDocument = (req: Request, res: Response)=>{
        const id = req.params.id;
        const [ error, updatedocumentDto ] = UpdateDocumentDto.create({ ...req.body, id });
        if( error ) return res.status(400).json({ error });

        new UpdateDocument(this.repository)
            .execute(updatedocumentDto!)
            .then((data)=>{
                res.json({
                    msg:"ok",
                    data: data
                });
            })
            .catch( error=> handleError(error, res) );
    }

    DeleteDocument = (req: Request, res: Response)=>{
        const id = req.params.id;
        new DeleteDocument(this.repository)
            .execute(id)
            .then((data)=>{
                res.json({
                    msg:"ok",
                    data: data
                });
            })
            .catch( error=> handleError(error, res) );
    };
    
}