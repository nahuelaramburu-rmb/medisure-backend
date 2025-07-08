import { prisma } from "../../data/postgres";
import { AuditLogDataSource, AuditLogsEntity, ExportAuditLogsDto } from "../../domain";


export class AuditLogDataSourceImpl implements AuditLogDataSource{
    async exportLogs(createExportLogDto: ExportAuditLogsDto): Promise<AuditLogsEntity[]> {
         const audit_logs = await prisma.audit_logs.findMany({
            where: {
                created_at: {
                    gte: createExportLogDto.from,
                    lte: createExportLogDto.to
                },
                
            }
        });
        return audit_logs.map( log  => AuditLogsEntity.fromObject(log));
    }
}