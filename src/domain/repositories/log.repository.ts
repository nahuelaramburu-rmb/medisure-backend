import { LogMedicalRecordEntity } from "../entities/log-medical-record.entity";


export abstract class LogRepository{
    
    abstract saveLog(log: LogMedicalRecordEntity): Promise<void>;

    abstract findLogByMedicalRecordId(id: string): Promise<LogMedicalRecordEntity[]>;
}   