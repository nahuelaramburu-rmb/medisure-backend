import { prisma } from "../../data/postgres";
import { AccessLogEntity, CreatePatientConsentDto, CreatePatientConsentLog, PatientConsentDatasource, PatientConsentEntity, PatientDataSource, PatientRepository } from "../../domain";




export class PatientConsentDatasourceImpl implements PatientConsentDatasource {

    async getConsentByPatientId(patientId: string): Promise<PatientConsentEntity[]> {
        const patient = this.getPatientById(patientId);
        if (!patient) throw new Error("Patient not found");
        const consent = await prisma.patient_consents.findMany({
            where: { patient_id: patientId },
            orderBy: { created_at: 'desc' },
        });
        
        return consent.map(consent => PatientConsentEntity.fromObject(consent));
    }

    async createConsent(createConsentDto: CreatePatientConsentDto, id_user:string, ip: string): Promise<PatientConsentEntity> {
        const patient = await this.getPatientById(createConsentDto.patient_id);
        if (!patient) throw new Error("Patient not found");
        const patientConsent = await prisma.patient_consents.create({
            data: {
                patient_id: createConsentDto.patient_id,
                is_accepted: createConsentDto.is_acepted, 
                revoked_at: createConsentDto.revoked_ad 
            }
        });
        const createConsentLogData: CreatePatientConsentLog = {
            patient_consent_id: patientConsent.id,
            user_id: id_user,
            accessed_at: new Date(),
            access_type: 'create',
            ip_address: ip 
        }
        this.createlogAccess(createConsentLogData);
        return PatientConsentEntity.fromObject(patientConsent);
    }

    async revokeConsent(id: string, id_user:string, ip: string): Promise<PatientConsentEntity> {
        
        const patientConsent = await prisma.patient_consents.update({
            where: { id: id },
            data: {
                is_accepted: false,
                revoked_at: new Date(),
            }
        });
        const createConsentLogData:CreatePatientConsentLog = {
            patient_consent_id: patientConsent.id,
            user_id: id_user,
            accessed_at: new Date(),
            access_type: 'write',
            ip_address: ip 
        }
        this.createlogAccess(createConsentLogData);
        return PatientConsentEntity.fromObject(patientConsent);
    }

    async getConsentLogsByPatient(patientId: string): Promise<PatientConsentEntity[]> {
        
        const consentLogsByPatient = await prisma.access_logs.findMany({
            where: { patient_consents: { id: patientId } },
            orderBy: { accessed_at: 'desc' }
        });
        return consentLogsByPatient.map(log => PatientConsentEntity.fromObject(log));
    }

    private async getPatientById(id: string): Promise<boolean>{
        const patient = await prisma.patients.findUnique({
            where: { id }
        });

        return !!patient; 
    }

    private async createlogAccess(createConsentLogData:CreatePatientConsentLog): Promise<void>{
        const {patient_consent_id, user_id, accessed_at, access_type, ip_address} = createConsentLogData;
        try{
            await prisma.access_logs.create({
                data:{
                    patient_consent_id,
                    user_id,
                    accessed_at,
                    access_type,
                    ip_address 
                }
            });

        }catch (error) {
            console.error("Error creating access log:", error);
            throw new Error("Failed to create access log");
        }
    }
}