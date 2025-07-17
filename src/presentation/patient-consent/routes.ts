import { Router } from "express";
import { Request, Response } from "express";
import { PatientConsentController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { PatientConsentDatasourceImpl, PatientConsentRepositoryImpl } from "../../infraestructure";

export class PatientConsentRoutes{
    static get routes():Router{
        const router = Router();
        const datasource = new PatientConsentDatasourceImpl();
        const patientConsentRepository = new PatientConsentRepositoryImpl(datasource);
        const patientConsentController = new PatientConsentController(patientConsentRepository);

        router.use(AuthMiddleware.validateJWT);
        router.get('/:patientId', (req, res) => {
            patientConsentController.getConsentsByPatientId(req, res);
        });
        router.post('/create', (req: Request, res: Response) => {
            patientConsentController.createConsent(req, res);
        });
        router.put('/revoke/:id', (req: Request, res: Response) => {
            patientConsentController.revokeConsent(req, res);
        });
        router.get('/logs/:patientId', (req, res) => {
            patientConsentController.getConsentLogs(req, res);
        });
        return router;
    }
}