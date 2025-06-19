import { Router } from "express";
import { AppointmentDatasourceImpl } from "../../infraestructure/datasources/appointment.datasource.impl";
import { AppointmentRepositoryImpl } from "../../infraestructure/repositories/appointment.repository.impl";
import { AppointmentContoller } from "./controller";



export class AppointmentRoutes {
    static get routes():Router{
        const router = Router();
        const dataSource = new AppointmentDatasourceImpl();
        const AppointmentRepository = new AppointmentRepositoryImpl(dataSource);
        const AppointmentController = new AppointmentContoller(AppointmentRepository);

        router.get('/', (req, res) => {
            AppointmentController.getAllAppointments(req, res);
        });

        router.get('/:id', (req, res)=>{
            AppointmentController.getAppointmentById(req, res);
        });

        router.post('/create', (req, res) => {
            AppointmentController.createAppointmnent(req, res);
        });

        router.put('/:id', (req, res) => {
            AppointmentController.updateAppointment(req, res);
        });

        router.delete('/:id', (req, res) => {
            AppointmentController.deleteAppointment(req, res);
        });
        
        return router;
    }
}