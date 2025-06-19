import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { RoleRoutes } from "./role/routes";
import { ClinicalTrialRoutes } from "./clinical_trial/routes";
import { PatientController } from "./patient/controller";
import { PatientRoutes } from "./patient/routes";
import { AppointmentRoutes } from "./appointment/routes";

export class AppRoutes{
    static get routes(): Router{
        const router = Router();

        router.use('/v1/api/auth', AuthRoutes.routes);
        router.use('/v1/api/roles', RoleRoutes.routes);
        router.use('/v1/api/clinical-trials', ClinicalTrialRoutes.routes);
        router.use('/v1/api/patients', PatientRoutes.routes);
        router.use('/v1/api/appointments', AppointmentRoutes.routes);
        
        return router;
    }
}