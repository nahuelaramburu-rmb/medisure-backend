import { Request, Response } from "express";
import { ClinicalTrialRepository, GetClinicalTrials, UpdateClinicalTrialDto } from "../../domain";
import { CreateClinicalTrial } from "../../domain/use-cases/clinical-trials/create-clinical.trial";
import { CreateClinicalTrialDto } from '../../domain/dtos/clinicalTrial/create-clinical.trial-dto';
import { GetClinicalTrial } from "../../domain/use-cases/clinical-trials/get-clinical.trial";
import { UpdateClinicalTrial } from "../../domain/use-cases/clinical-trials/update-clinical.trial";



export class ClinicalTrialController {
    constructor(
        private readonly clinicalTrialRepository: ClinicalTrialRepository
    ){}
    
    getAllClinicalTrials = async (req: Request, res: Response) => {
        new GetClinicalTrials(this.clinicalTrialRepository)
        .execute()
        .then((data)=> {
            res.json({
                msg: 'ok',
                data    
            });
        })
        .catch((error) => {
            console.error(error);
        })
    }

    getTrialById = async (req: Request, res: Response) =>{
        const id = req.params.id;

        new GetClinicalTrial(this.clinicalTrialRepository)
        .execute(id)
        .then((data) => {
            res.json({
                msg: 'ok',
                data
            });
        })
        .catch((error) => {
            if (error instanceof Error) {
                return res.status(404).json({ error: error.message });
            }
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        });
    }
    
    createClinicalTrial= async (req: Request, res: Response) =>  {
        const [error, createClinicalTrialDto] = CreateClinicalTrialDto.create(req.body);
        if (error) return res.status(400).json({ error });
        new CreateClinicalTrial(this.clinicalTrialRepository)
        .execute(createClinicalTrialDto!)
        .then((data) => {
            res.json({
                msg: 'ok',
                data
            });
        })
        .catch((error) => {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        });
    }

    updateClinicalTrial = async (req: Request, res: Response)=>{
        const id = req.params.id;
        const [error, updateClinicalTrialDto] = UpdateClinicalTrialDto.create({...req.body, id});
        if (error) return res.status(400).json({ error });
        new UpdateClinicalTrial(this.clinicalTrialRepository)
            .execute(updateClinicalTrialDto!)
            .then((data) => {
                res.json({
                    msg: 'ok',
                    data
                })
            })
            .catch((error) => {
                if (error instanceof Error) {
                    return res.status(404).json({ error: error.message });
                }
                console.error(error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        )
    }

    deleteClinicalTrial = async (req: Request, res: Response)=>{
        const id = req.params.id;
        new GetClinicalTrial(this.clinicalTrialRepository)
            .execute(id)
            .then(() => {
                return this.clinicalTrialRepository.deleteById(id);
            })
            .then((data) => {
                res.json({
                    msg: 'ok',
                    data
                });
            })
            .catch((error) => {
                if (error instanceof Error) {
                    return res.status(404).json({ error: error.message });
                }
                console.error(error);
                return res.status(500).json({ error: 'Internal Server Error' });
            });
    }
}