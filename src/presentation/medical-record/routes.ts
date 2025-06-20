import { Router } from "express";
import { MedicalRecordDataSourceImpl } from '../../infraestructure/datasources/medical-record.datasource.impl';
import { MedicalRecordRepositoryImpl } from "../../infraestructure/repositories/medical-record.repository.impl";
import { MedicalRecordController } from "./controller";


export class MedicalRecordRoutes {
    static get routes(): Router{
        const router = Router();
        const datasource = new MedicalRecordDataSourceImpl();
        const medicalRecordRepository = new MedicalRecordRepositoryImpl(datasource);
        const medicalRecordController = new MedicalRecordController (medicalRecordRepository);

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