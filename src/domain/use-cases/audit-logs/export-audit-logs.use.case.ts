import { ExportAuditLogsDto } from "../../dtos";
import { AuditLogsEntity } from "../../entities/audit-logs.entity";
import { CustomError } from "../../errors/custom.error";
import { AuditLogRepository } from "../../repositories/audit-log.repository";


interface ExportAuditLogsUseCase {
    execute(exportAuditLogsDto: ExportAuditLogsDto): Promise<string>;
}

export class ExportAuditLogs implements ExportAuditLogsUseCase{
    constructor(
        private readonly auditLogRepository: AuditLogRepository
    ){}
    async execute(exportAuditLogsDto: ExportAuditLogsDto): Promise<string> {
        const logs = await this.auditLogRepository.exportLogs(exportAuditLogsDto);
        if ( !logs || logs.length === 0 ) throw new CustomError(404,"No logs found for the given criteria");
        return this.auditLogsToCSV(logs);
    }

    private auditLogsToCSV(logs: AuditLogsEntity[]): string {
        if (!logs || logs.length === 0) return '';


        const headers = Object.keys(logs[0]);
        const csvRows = [
            headers.join(','), // Encabezados
            ...logs.map(log =>
                headers.map(h => {
                    let value = (log as any)[h];
                    if (typeof value === 'object' && value !== null) value = JSON.stringify(value);

                    return `"${String(value ?? '').replace(/"/g, '""')}"`;
                }).join(',')
            )
        ];
        return csvRows.join('\n');
    }

}