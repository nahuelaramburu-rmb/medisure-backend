import { AccessLogEntity, CreatePatientConsentDto, PatientConsentDatasource, PatientConsentEntity, PatientConsentRepository } from "../../domain";


export class PatientConsentRepositoryImpl implements PatientConsentRepository{
    constructor(
        private readonly datasource: PatientConsentDatasource
    ){}
    getConsentByIdPatient(patientId: string): Promise<PatientConsentEntity[]> {
        return this.datasource.getConsentByPatientId(patientId);
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