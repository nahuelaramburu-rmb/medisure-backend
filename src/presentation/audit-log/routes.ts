import { Router } from "express";
import { AuditLogDataSourceImpl } from "../../infraestructure/datasources/audit-log.datasource.impl";
import { AuditLogRepositoryImpl } from "../../infraestructure/repositories/audit-log.repository.impl";
import { AuditLogController } from "./controller";


export class AuditLogRouter{
    static get routes():Router{
        const router = Router();
        const dataSource = new AuditLogDataSourceImpl();
        const auditLogRepository = new AuditLogRepositoryImpl(dataSource);
        const auditLogController = new AuditLogController(auditLogRepository);

        router.get('/export', (req, res) => {
            auditLogController.exportLogs(req, res);
        });
        return router;
    }
}