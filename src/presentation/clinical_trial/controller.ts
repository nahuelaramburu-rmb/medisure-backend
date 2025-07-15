import { Request, Response } from "express";
import { ClinicalTrialRepository, EnrollPatientDto, EnrollPatientInTrial, GetClinicalTrialElegibleCandidates, GetClinicalTrialEnrollmentStatus, GetClinicalTrialPerformanceMetrics, GetClinicalTrials, GetClinicalTrialSummary, GetKpiAcrossTrialsDto, PaginationDto, UpdateClinicalTrialDto } from "../../domain";
import { CreateClinicalTrial } from "../../domain/use-cases/clinical-trials/create-clinical.trial";
import { CreateClinicalTrialDto } from '../../domain/dtos/clinicalTrial/create-clinical.trial-dto';
import { GetClinicalTrial } from "../../domain/use-cases/clinical-trials/get-clinical.trial";
import { UpdateClinicalTrial } from "../../domain/use-cases/clinical-trials/update-clinical.trial";
import { handleError } from "../helpers/errors";
import { create } from 'domain';



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
        .catch((error) => handleError(error, res));
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
        .catch((error) => handleError(error, res));
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
        .catch((error) => handleError(error, res));
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
            .catch((error) => handleError(error, res)
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
            .catch((error) => handleError(error, res));
    }
    getClinicalTrialSumary = (req: Request, res: Response) => {
        new GetClinicalTrialSummary(this.clinicalTrialRepository)
            .execute()
            .then( data => {res.json( data )})
            .catch( error => handleError(error, res) );

    }

    getClinicalTrialEnrollmentStatus = (req: Request, res: Response) => {
        const id = req.params.id;
        new GetClinicalTrialEnrollmentStatus(this.clinicalTrialRepository)
            .execute(id)
            .then( data => { res.json(data) })
            .catch( error => handleError(error, res) );
    }

    getElegibleCandidates = (req: Request, res: Response)=>{
        const id = req.params.id;
        const minScore = req.query.minScore ? +req.query.minScore : 0;

        const { page=1, limit=10} = req.query;
        const [error, paginationDto] = PaginationDto.create(+page,+limit);
        if (error) return res.status(400).json({ error });

        new GetClinicalTrialElegibleCandidates(this.clinicalTrialRepository)
            .execute(id, paginationDto!, minScore)
            .then( data => { res.json(data)})
            .catch( error => handleError(error, res) );
    }
    getClinicalTrialPerformanceMetrics = (req: Request, res: Response) =>{
        
        const [error, groupByValue] = GetKpiAcrossTrialsDto.create(req.query);
        if (error) return res.status(400).json({ error });

        new GetClinicalTrialPerformanceMetrics(this.clinicalTrialRepository)
            .execute(groupByValue!)
            .then(data => {
                res.json(data);
            })
            .catch(error => handleError(error, res));
    }

    enrollPatientInTrial = (req: Request, res: Response) => {
        const [error, enrollPatientDto] = EnrollPatientDto.create(req.body);
        if (error) return res.status(400).json({ error });
        const id = req.params.id;
        new EnrollPatientInTrial(this.clinicalTrialRepository)
            .execute(enrollPatientDto!, id)
            .then(data => {
                res.json(data);
            })
            .catch(error => handleError(error, res));

    }
}