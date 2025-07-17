import { Router } from "express";
import { ClinicalTrialController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { ClinicalTrialDataSourceImpl, ClinicalTrialRepositoryImpl } from "../../infraestructure";



export class ClinicalTrialRoutes {
    static get routes():Router{
        const router = Router();
        const dataSource = new ClinicalTrialDataSourceImpl();
        const clinicalTrialRepository = new ClinicalTrialRepositoryImpl(dataSource);
        const clinicalTrialController = new ClinicalTrialController(clinicalTrialRepository);
        
        router.use(AuthMiddleware.validateJWT);

        router.get('/summary', clinicalTrialController.getClinicalTrialSumary);

        router.get('/:id/enrollment-status', clinicalTrialController.getClinicalTrialEnrollmentStatus);

        router.get('/:id/elegible-candidates', (req, res) => {
            clinicalTrialController.getElegibleCandidates(req, res);
        });

        router.get('/performance-metrics', (req, res) => {
            clinicalTrialController.getClinicalTrialPerformanceMetrics(req,res)
        });

        router.post('/:id/enrollment', (req, res) => {
            clinicalTrialController.enrollPatientInTrial(req, res);
        });
        
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