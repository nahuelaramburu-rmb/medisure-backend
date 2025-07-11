
export class AccessLogEntity {
    constructor(
        public id: string,                
        public patient_consent_id: string,
        public user_id: string,
        public accessed_at: Date,
        public access_type: string,
        public ip_address?: string,
    ) { }
    
    static fromObject(obj: any): AccessLogEntity {
        const { id, patient_consent_id, user_id, accessed_at, access_type, ip_address } = obj;
        
        return new AccessLogEntity(
            id,
            patient_consent_id,
            user_id,
            new Date(accessed_at),
            access_type,
            ip_address
        );
    }
}