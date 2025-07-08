import { AuditLogDataSource, AuditLogRepository, AuditLogsEntity, ExportAuditLogsDto } from "../../domain";

export class AuditLogRepositoryImpl implements AuditLogRepository{
    constructor(
        private readonly datasource: AuditLogDataSource
    ){}
    exportLogs(createExportLogDto: ExportAuditLogsDto): Promise<AuditLogsEntity[]> {
        return this.datasource.exportLogs(createExportLogDto);
    }

}