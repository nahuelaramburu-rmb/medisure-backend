import { Router } from "express";
import { CohortPatientDataSource } from "../../domain/datasources/patient-cohort.datasource";
import { CohortPatientDataSourceImpl } from '../../infraestructure/datasources/cohort-patient.datasource.impl';
import { CohortPatientRepositoryImpl } from '../../infraestructure/repositories/cohort-patient.repository.impl';
import { CohortPatientController } from "./controller";


export class CohortPatientRouter{
    static get routes():Router{
        const router = Router();
        const datasource = new CohortPatientDataSourceImpl();
        const repository = new CohortPatientRepositoryImpl(datasource);
        const cohortPatientController = new CohortPatientController(repository);
        router.post('/cohorts/:cohortId/patients',(req, res) => {
            cohortPatientController.addPatient(req, res);
        });
        router.delete('/cohorts/:cohortId/patients/:patientId', (req, res) => {
            cohortPatientController.removePatient(req, res);
        });

        return router;
    }
}