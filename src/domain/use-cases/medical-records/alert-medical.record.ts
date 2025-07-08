import { LogMedicalRecordEntity } from "../../entities/log-medical-record.entity";
import { MedicalRecordEntity } from "../../entities/medical-record.entity";
import { LogRepository } from "../../repositories/log.repository";
import { MedicalRecordRepository } from '../../repositories/medical-record.repository';


interface CheckMedicalRecordAlertUseCase{
    execute(): Promise<void>;
}

export class CheckMedicalRecordAlert implements CheckMedicalRecordAlertUseCase {
        constructor(
            private readonly logRepository: LogRepository,
            private readonly medicalRecordRepository: MedicalRecordRepository

        ){}
    async execute(): Promise<void> {
        try{
            console.log('🚨 CRON Alert: Checking for critical medical records...');
            const recentRecords = await this.getRecentCriticalRecords();
            let processedCount = 0;
            for (const record of recentRecords) {
                // Verificar si ya se procesó (usando logs como control)
                const alreadyProcessed = await this.isAlreadyProcessed(record.id);
                
                if (!alreadyProcessed) {
                    const severity = this.extractSeverity(record.data);
                    
                    if (severity && (severity === 'moderate' || severity === 'severe')) {
                        // Crear log de alerta
                        const logMessage = this.buildAlertMessage(record, severity);
                        const logEntity = new LogMedicalRecordEntity(
                            record.id,
                            logMessage,
                            severity
                        );

                        await this.logRepository.saveLog(logEntity);
                        console.log('🚨 CRITICAL ALERT:', logMessage);
                        processedCount++;
                    }
                }
            }
             if (processedCount > 0) {
                console.log(`🚨 CRON Alert: Processed ${processedCount} critical medical records`);
            }
        }catch(error){
            console.error('Error processing medical records:', error);
        }
    }
    private buildAlertMessage(record: any, severity: string):string {
        return `🚨 CRITICAL ALERT: Medical Record [${record.id}] has ${severity.toUpperCase()} severity. ` +
               `Patient: [${record.patient_id}], Type: [${record.record_type}]. ` +
               `Requires immediate medical attention.`;
    
    }
    private extractSeverity(data: any) {

        return data?.severity; 
    }
    private async isAlreadyProcessed(id: string): Promise<boolean> {
        const existingLogs = await this.logRepository.findLogByMedicalRecordId(id);
        return existingLogs.length > 0;
    }
    private async getRecentCriticalRecords(): Promise<MedicalRecordEntity[]>{
        const timeThreshold = new Date();
        timeThreshold.setSeconds(timeThreshold.getSeconds() - 10); 
        return await this.medicalRecordRepository.getRecentRecordsWithCriticalSeverity(timeThreshold);
    }
    
}