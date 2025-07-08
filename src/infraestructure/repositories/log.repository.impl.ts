import { LogDatasource, LogMedicalRecordEntity } from "../../domain";
import { LogRepository } from "../../domain/repositories/log.repository";



export class LogRepositoryImpl implements LogRepository{
    constructor(
        private readonly logDatasource: LogDatasource
    ){}
    
    async saveLog(log: LogMedicalRecordEntity): Promise<void> {
        return this.logDatasource.saveLog(log);
    }
    async findLogByMedicalRecordId(id: string): Promise<LogMedicalRecordEntity[]> {
        return this.logDatasource.findLogsByMedicalRecordId(id);
    }
}