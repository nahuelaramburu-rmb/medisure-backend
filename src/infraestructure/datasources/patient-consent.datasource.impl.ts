import { prisma } from "../../data/postgres";
import { AccessLogEntity, CreatePatientConsentDto, PatientConsentDatasource, PatientConsentEntity, PatientDataSource, PatientRepository } from "../../domain";




export class PatientConsentDatasourceImpl implements PatientConsentDatasource {

    async getConsentsByPatientId(patientId: string): Promise<PatientConsentEntity> {
        const patient = this.getPatientById(patientId);
        if (!patient) throw new Error("Patient not found");
        const consent = await prisma.patient_consents.findMany({
            where: { patient_id: patientId },
            orderBy: { created_at: 'desc' },
            
        });
        return PatientConsentEntity.fromObject(consent);
    }

    async createConsent(createConsentDto: CreatePatientConsentDto): Promise<PatientConsentEntity> {
        const patient = this.getPatientById(createConsentDto.patient_id);
        if (!patient) throw new Error("Patient not found");
        const patientConsent = await prisma.patient_consents.create({
            data: {
                patient_id: createConsentDto.patient_id,
                is_accepted: createConsentDto.is_acepted, 
                revoked_at: createConsentDto.revoked_ad 
            }
        });
        return PatientConsentEntity.fromObject(patientConsent);
    }

    async revokeConsent(id: string, revokedAt?: Date): Promise<PatientConsentEntity> {
        
        const patientConsent = await prisma.patient_consents.update({
            where: { id: id },
            data: {
                is_accepted: false,
                revoked_at: revokedAt ? new Date(revokedAt) : new Date(),
            }
        });
        return PatientConsentEntity.fromObject(patientConsent);
    }

    async getConsentLogsByPatient(patientId: string): Promise<AccessLogEntity[]> {
        const consentLogsByPatient = await prisma.access_logs.findMany({
            where: { patient_consents: { id: patientId } },
            orderBy: { accessed_at: 'desc' }
        });
        return consentLogsByPatient.map(log => AccessLogEntity.fromObject(log));
    }

    private async getPatientById(id: string): Promise<boolean>{
        const patient = await prisma.patients.findUnique({
            where: { id }
        });

        return !!patient; 
    }
}