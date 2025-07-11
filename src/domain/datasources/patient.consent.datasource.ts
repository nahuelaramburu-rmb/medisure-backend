import { CreatePatientConsentDto } from "../dtos";
import { AccessLogEntity } from "../entities/access-log.entity";
import { PatientConsentEntity } from "../entities/patient-consent.entity";



export abstract class PatientConsentDatasource {
    abstract getConsentByPatientId(patientId: string): Promise<PatientConsentEntity[]>;
    abstract createConsent(createConsentDto: CreatePatientConsentDto): Promise<PatientConsentEntity>;
    abstract revokeConsent(id: string, revokedAt?: Date): Promise<PatientConsentEntity>;
    abstract getConsentLogsByPatient(patientId: string): Promise<AccessLogEntity[]>;
}