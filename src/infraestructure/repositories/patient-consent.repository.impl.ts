import { AccessLogEntity, CreatePatientConsentDto, PatientConsentDatasource, PatientConsentEntity, PatientConsentRepository } from "../../domain";


export class PatientConsentRepositoryImpl implements PatientConsentRepository{
    constructor(
        private readonly datasource: PatientConsentDatasource
    ){}
    getConsent(patientId: string): Promise<PatientConsentEntity> {
        return this.datasource.getConsent(patientId);
    }
    createConsent(createConsentDto: CreatePatientConsentDto): Promise<PatientConsentEntity> {
        return this.datasource.createConsent(createConsentDto);
    }
    revokeConsent(id: string, revokedAt?: Date): Promise<PatientConsentEntity> {
        return this.datasource.revokeConsent(id, revokedAt);
    }
    getConsentLogsByPatient(patientId: string): Promise<AccessLogEntity[]> {
        return this.datasource.getConsentLogsByPatient(patientId);
    }
    
}