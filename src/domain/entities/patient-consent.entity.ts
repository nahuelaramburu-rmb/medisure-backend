

export class PatientConsentEntity{
    constructor(
        public id: string,
        public patient_id: string,
        public is_acepted: boolean = true,
        public revoked_ad?: Date, 

    ){}

    static fromObject(obj: any): PatientConsentEntity {
        const { id, patient_id, is_accepted, revoked_at } = obj;
        if ( !patient_id ) throw new Error("Patient ID is required to create a PatientConsentEntity");
        let revoked_date; 
        if ( revoked_at ){
            revoked_date = new Date(revoked_at);
            if (isNaN(revoked_date.getTime())) throw new Error('revoked_at must be a valid date');
        }
        return new PatientConsentEntity(
            id, 
            patient_id,
            is_accepted,
            revoked_date
        );
    }
}