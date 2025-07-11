import { Router } from "express";
import { PatientConsentDatasourceImpl } from "../../infraestructure/datasources/patient-consent.datasource.impl";
import { PatientConsentRepositoryImpl } from "../../infraestructure/repositories/patient-consent.repository.impl";
import { PatientConsentController } from "./controller";


export class PatientConsentRoutes{
    static get routes():Router{
        const router = Router();
        const datasource = new PatientConsentDatasourceImpl();
        const patientConsentRepository = new PatientConsentRepositoryImpl(datasource);
        const patientConsentController = new PatientConsentController(patientConsentRepository);

        router.get('/:patientId', (req, res) => {
            patientConsentController.getConsentsByPatientId(req, res);
        });
        router.post('/create', (req, res) => {
            patientConsentController.createConsent(req, res);
        });
        router.put('/revoke/:id', (req, res) => {
            patientConsentController.revokeConsent(req, res);
        });
        router.get('/logs/:patientId', (req, res) => {
            patientConsentController.getConsentLogs(req, res);
        });
        return router;
    }
}