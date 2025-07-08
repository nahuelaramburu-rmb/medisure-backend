import { LogMedicalRecordEntity } from "../entities/log-medical-record.entity";



export abstract class LogDatasource{
    abstract saveLog(log: LogMedicalRecordEntity): Promise<void>;
    abstract findLogsByMedicalRecordId(messageContains: string): Promise<LogMedicalRecordEntity[]>;
    
}