import { ExportAuditLogsDto } from "../dtos";
import { AuditLogsEntity } from "../entities/audit-logs.entity";


export abstract class AuditLogDataSource{
    abstract exportLogs(createExportLogDto: ExportAuditLogsDto): Promise<AuditLogsEntity[]>;
}