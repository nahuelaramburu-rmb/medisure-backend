import { Router } from "express";
import { CohortPatientController } from "./controller";
import { CohortPatientDataSourceImpl, CohortPatientRepositoryImpl } from "../../infraestructure";
import { AuthMiddleware } from "../middlewares/auth.middleware";


export class CohortPatientRouter{
    static get routes():Router{
        const router = Router();
        const datasource = new CohortPatientDataSourceImpl();
        const repository = new CohortPatientRepositoryImpl(datasource);
        const cohortPatientController = new CohortPatientController(repository);

        router.use(AuthMiddleware.validateJWT);
        router.post('/:cohortId/patients',(req, res) => {
            cohortPatientController.addPatient(req, res);
        });
        router.delete('/:cohortId/patients/:patientId', (req, res) => {
            cohortPatientController.removePatient(req, res);
        });

        return router;
    }
}