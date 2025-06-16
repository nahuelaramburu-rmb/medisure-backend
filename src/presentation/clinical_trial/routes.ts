import { Router } from "express";
import { ClinicalTrialDataSourceImpl } from '../../infraestructure/datasources/clinical-trial.datasource.impl';
import { ClinicalTrialRepositoryImpl } from '../../infraestructure/repositories/clinical-trial.repository.impl';
import { ClinicalTrialController } from "./controller";



export class ClinicalTrialRoutes {
    static get routes():Router{
        const router = Router();
        const dataSource = new ClinicalTrialDataSourceImpl();
        const clinicalTrialRepository = new ClinicalTrialRepositoryImpl(dataSource);
        const clinicalTrialController = new ClinicalTrialController(clinicalTrialRepository);

        router.get('/', (req, res) => {
            clinicalTrialController.getAllClinicalTrials(req, res);
        });

        router.get('/:id', (req, res)=>{
            clinicalTrialController.getTrialById(req, res);
        });

        router.post('/create', (req, res) => {
            clinicalTrialController.createClinicalTrial(req, res);
        });

        router.put('/:id', (req, res) => {
            clinicalTrialController.updateClinicalTrial(req, res);
        });

        router.delete('/:id', (req, res) => {
            clinicalTrialController.deleteClinicalTrial(req, res);
        });
        
        return router;
    }
}