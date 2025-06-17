import { Router } from "express";
import { PatientDataSource } from "../../domain";
import { PatientDataSourceImpl, PatientRepositoryImpl } from "../../infraestructure";
import { PatientController } from "./controller";



export class PatientRoutes {
    static get routes(): Router{
        const router = Router();
        const datasource = new PatientDataSourceImpl();
        const patientRepository = new PatientRepositoryImpl(datasource);
        const patientController = new PatientController (patientRepository);

        router.get('/', patientController.getPatients);
        router.get('/:id', patientController.getPatientById);
        router.post('/create', (req, res)=>{
            patientController.createPatient(req, res);
        });
        router.put('/:id', (req, res) => {
            patientController.updatePatient(req, res);
        });
        router.delete('/:id', patientController.deletePatient);
        
        return router;
    }
}