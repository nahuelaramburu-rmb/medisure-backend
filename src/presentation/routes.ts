import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { RoleRoutes } from "./role/routes";
import { ClinicalTrialRoutes } from "./clinical_trial/routes";
import { PatientRoutes } from "./patient/routes";
import { AppointmentRoutes } from "./appointment/routes";
import { MedicalRecordRoutes } from "./medical-record/routes";
import { DocumentRoutes } from "./document/routes";
import { CohortRouter } from "./cohorts/routes";
import { CohortPatientController } from "./cohort-patient/controller";
import { CohortPatientRouter } from "./cohort-patient/routes";

export class AppRoutes{
    static get routes(): Router{
        const router = Router();

        router.use('/v1/api/auth', AuthRoutes.routes);
        router.use('/v1/api/roles', RoleRoutes.routes);
        router.use('/v1/api/clinical-trials', ClinicalTrialRoutes.routes);
        router.use('/v1/api/patients', PatientRoutes.routes);
        router.use('/v1/api/appointments', AppointmentRoutes.routes);
        router.use('/v1/api/medical-records', MedicalRecordRoutes.routes);
        router.use('/v1/api/documents', DocumentRoutes.routes);
        router.use('/v1/api/cohorts', CohortRouter.routes); 
        router.use('/v1/api/cohorts', CohortPatientRouter.routes); // Cohort patients routes
        return router;
    }
}