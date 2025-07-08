import { ExportAuditLogsDto } from "../dtos";
import { AuditLogsEntity } from "../entities/audit-logs.entity";


export abstract class AuditLogRepository {
    abstract exportLogs(createExportLogDto: ExportAuditLogsDto): Promise<AuditLogsEntity[]>;
}