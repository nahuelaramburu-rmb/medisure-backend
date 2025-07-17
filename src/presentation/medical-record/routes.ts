import { Router } from "express";
import { MedicalRecordController } from "./controller";
import { MedicalRecordDataSourceImpl, MedicalRecordRepositoryImpl } from "../../infraestructure";
import { AuthMiddleware } from "../middlewares/auth.middleware";


export class MedicalRecordRoutes {
    static get routes(): Router{
        const router = Router();
        const datasource = new MedicalRecordDataSourceImpl();
        const medicalRecordRepository = new MedicalRecordRepositoryImpl(datasource);
        const medicalRecordController = new MedicalRecordController (medicalRecordRepository);

        router.use(AuthMiddleware.validateJWT);
        router.get('/', medicalRecordController.getMedicalRecords);
        router.get('/:id', medicalRecordController.getMedicalRecordById);
        router.post('/create', (req, res)=>{
            medicalRecordController.createMedicalRecord(req, res);
        });
        router.put('/:id', (req, res) => {
            medicalRecordController.updateMedicalRecord(req, res);
        });
        router.delete('/:id', medicalRecordController.deleteMedicalRecord);
        
        return router;
    }
}