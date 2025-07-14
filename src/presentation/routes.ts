import { Router } from "express";
import {    AppointmentRoutes, 
            AuditLogRouter, 
            AuthRoutes, 
            ChatRoutes, 
            ClinicalTrialRoutes, 
            CohortPatientRouter, 
            CohortRouter, 
            DocumentRoutes, 
            MedicalRecordRoutes, 
            PatientConsentRoutes, 
            PatientRoutes, 
            RoleRoutes, 
            UserRoutes 
        } from '../presentation/index';



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
        router.use('/v1/api/cohorts', CohortPatientRouter.routes); 
        router.use('/v1/api/audit-logs', AuditLogRouter.routes);
        router.use('/v1/api/chat', ChatRoutes.routes);
        router.use('/v1/api/consents', PatientConsentRoutes.routes);
        router.use('/v1/api/users', UserRoutes.routes);
        return router;
    }
}