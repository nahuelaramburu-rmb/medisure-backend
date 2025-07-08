import { SeverityLevel } from "../enums";



export class LogMedicalRecordEntity{
    public medical_record_id: string;
    public level: SeverityLevel;
    public message: string;
    public createdAt: Date;
    constructor(medical_record_id: string, message: string, level: SeverityLevel){
        this.medical_record_id = medical_record_id;
        this.message = message;
        this.level = level;
        this.createdAt = new Date();
    }
  //"{"medical_record_id", "level": "moderate", "message":"Hola Mundo", "createdAt":"128937TZ12378123" }"

    static fromJson = (json: string): LogMedicalRecordEntity =>{
        const {medical_record_id, message, level, createdAt } = JSON.parse(json);
        const log = new LogMedicalRecordEntity(medical_record_id, message, level);
        log.createdAt = new Date(createdAt);
        return log;
    }
}