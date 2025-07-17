export interface CreatePatientConsentLog{
    patient_consent_id: string;
    user_id: string;
    accessed_at: Date;
    access_type: string;
    ip_address: string;
}