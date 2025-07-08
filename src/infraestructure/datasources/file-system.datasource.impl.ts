import { LogDatasource, LogMedicalRecordEntity, SeverityLevel } from "../../domain";
import fs from 'fs';


export class FileSystemDataSourceImpl implements LogDatasource {
    private readonly logPath = 'logs/';
    private readonly allLogsPath = 'logs/logs-all.log';
    private readonly mediumLogsPath = 'logs/logs-medium.log';
    private readonly highLogsPath = 'logs/logs-high.log';
    constructor() {
        this.createLogsFiles();
    }
    private createLogsFiles = () => {
        if (!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath);
        }
        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath,
        ].forEach(path => {
            if (fs.existsSync(path)) return;

            fs.writeFileSync(path, '');
        });
    }

    async saveLog(log: LogMedicalRecordEntity): Promise<void> {
        const logAsJson = `${JSON.stringify(log)}\n`;
        fs.appendFileSync(this.allLogsPath, logAsJson);

        
    }

    async findLogsByMedicalRecordId(medicalRecordId: string): Promise<LogMedicalRecordEntity[]> {
        try {
            const logsExist = fs.existsSync(this.allLogsPath);
            if (!logsExist) return [];

            const content = fs.readFileSync(this.allLogsPath, 'utf-8');
            const logLines = content.trim().split('\n').filter(line => line.length > 0);

            const filteredLogs = logLines
                .map(line => {
                    try {
                        return LogMedicalRecordEntity.fromJson(line);
                    } catch (error) {
                        return null;
                    }
                })
                .filter(log => log && log.medical_record_id === medicalRecordId)
                .filter(Boolean) as LogMedicalRecordEntity[];

            return filteredLogs;
        } catch (error) {
            console.error('Error finding logs by medical record ID:', error);
            return [];
        }
    }
}