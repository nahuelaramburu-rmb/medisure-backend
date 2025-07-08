import { Request, Response } from "express";
import { AuditLogRepository, ExportAuditLogs, ExportAuditLogsDto } from "../../domain";
import { handleError } from "../helpers/errors";



export class AuditLogController{
    constructor(
        private readonly auditLogRepository: AuditLogRepository,
    ){}

    exportLogs = async (req: Request, res: Response) => {
        try {
            
            const [error, dto] = ExportAuditLogsDto.create(req.query);
            if (error) return res.status(400).json({ error });
            

            const data = await new ExportAuditLogs(this.auditLogRepository).execute(dto!);
            res.attachment('audit-logs.csv').send(data);
        } catch (error) {
            
            handleError(error, res);
        }
    }
}