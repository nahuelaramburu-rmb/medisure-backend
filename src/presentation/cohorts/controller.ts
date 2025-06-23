import { CohortRepository, CreateCohort, CreateCohortDto, DeleteCohort, GetCohortById, GetCohorts, UpdateCohort, UpdateCohortDto } from "../../domain";
import { handleError } from "../helpers/errors";
import { Request, Response } from "express";
import { create } from 'domain';

export class CohortController{
    constructor(
        private readonly repository: CohortRepository
    ){}

    getCohorts = (req: Request, res: Response)=>{
        new GetCohorts(this.repository)
            .execute()
            .then((data)=>{
                res.json({
                    msg:"ok",
                    data: data
                });
            })
            .catch( error=> handleError(error, res) );
    }

    getCohortById = (req: Request, res: Response)=>{
        const id = req.params.id;
        new GetCohortById(this.repository)
            .execute(id)
            .then((cohort)=>{
                res.json({
                    msg:"ok",
                    data: cohort
                });
            })
            .catch( error=> handleError(error, res) );
    }

    createCohort = (req: Request, res: Response)=>{
        const [ error, cohortDto ] = CreateCohortDto.create(req.body);

        if( error ) return res.status(400).json({ error });

        new CreateCohort(this.repository)
            .execute(cohortDto!)
            .then((data)=>{
                res.json({
                    msg:"ok",
                    data: data
                });
            })
            .catch( error=> handleError(error, res) );
    }

    updateCohort = (req: Request, res: Response)=>{
        const id = req.params.id;
        const [ error, updateCohortDto ] = UpdateCohortDto.create({ ...req.body, id });
        if( error ) return res.status(400).json({ error });

        new UpdateCohort(this.repository)
            .execute(updateCohortDto!)
            .then((data)=>{
                res.json({
                    msg:"ok",
                    data: data
                });
            })
            .catch( error=> handleError(error, res) );
    }

    deleteCohort = (req: Request, res: Response)=>{
        const id = req.params.id;
        new DeleteCohort(this.repository)
            .execute(id)
            .then((data)=>{
                res.json({
                    msg:"ok",
                    data: data
                });
            })
            .catch( error=> handleError(error, res) );
    }
}