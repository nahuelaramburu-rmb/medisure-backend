import { AccessLogEntity, CreatePatientConsentDto, PatientConsentDatasource, PatientConsentEntity, PatientConsentRepository } from "../../domain";


export class PatientConsentRepositoryImpl implements PatientConsentRepository{
    constructor(
        private readonly datasource: PatientConsentDatasource
    ){}
    getConsentByIdPatient(patientId: string): Promise<PatientConsentEntity[]> {
        return this.datasource.getConsentByPatientId(patientId);
    }
    createConsent(createConsentDto: CreatePatientConsentDto, id_user:string, ip: string): Promise<PatientConsentEntity> {
        return this.datasource.createConsent(createConsentDto, id_user, ip);
    }
    revokeConsent(id: string,  id_user:string, ip:string): Promise<PatientConsentEntity> {
        return this.datasource.revokeConsent(id, id_user, ip);
    }
    getConsentLogsByPatient(patientId: string): Promise<PatientConsentEntity[]> {
        return this.datasource.getConsentLogsByPatient(patientId);
    }
    
}