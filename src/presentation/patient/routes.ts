import { Router } from "express";
import { Request, Response } from "express";
import { PatientDataSourceImpl, PatientRepositoryImpl } from "../../infraestructure";
import { PatientController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";



export class PatientRoutes {
    static get routes(): Router {
        const router = Router();
        const datasource = new PatientDataSourceImpl();
        const patientRepository = new PatientRepositoryImpl(datasource);
        const patientController = new PatientController(patientRepository);

        router.get('/', (req: Request, res: Response) => { patientController.getPatients(req, res) });
        router.get('/:id', [AuthMiddleware.validateJWT], patientController.getPatientById);
        router.post('/create', [AuthMiddleware.validateJWT], (req: Request, res: Response) => {
            patientController.createPatient(req, res);
        });
        router.put('/:id', (req, res) => {
            patientController.updatePatient(req, res);
        });
        router.delete('/:id', patientController.deletePatient);

        router.get('/export/patients', (req, res) => {
            patientController.exportPatients(req, res);
        });
        return router;
    }
}