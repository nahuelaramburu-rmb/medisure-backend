import { Validators } from "../../../config";


export class CreatePatientConsentDto {
    constructor(
        public patient_id: string,
        public is_acepted: boolean = true,
        public revoked_ad?: Date, 
    ){}
    static create( object: {[key: string]:any}): [string?, CreatePatientConsentDto?] {
        const { patient_id, is_acepted, revoked_ad } = object;
        if (!patient_id) return ['Missing patient_id'];
        if (typeof is_acepted !== 'boolean') return ['is_acepted must be a boolean'];
        if ( revoked_ad && Validators.date.test(revoked_ad) ) return ['revoked_ad must be a valid date'];
        return [
            undefined, 
            new CreatePatientConsentDto(
                patient_id,
                is_acepted,
                revoked_ad ? new Date(revoked_ad) : undefined
            )
        ]
    }
}