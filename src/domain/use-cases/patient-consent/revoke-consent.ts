import { PatientConsentEntity } from "../../entities/patient-consent.entity";
import { PatientConsentRepository } from "../../repositories/patient-consent.repository";

interface RevokeConsentUseCase {
    execute(id: string, id_user:string, ip:string): Promise<PatientConsentEntity>;
}
export class RevokeConsent implements RevokeConsentUseCase {
    constructor(
        private readonly patientConsentRepository: PatientConsentRepository
    ) {}

    async execute(id: string, id_user:string, ip:string): Promise<PatientConsentEntity> {
        if (!id) {
            throw new Error("Consent ID is required");
        }
        return this.patientConsentRepository.revokeConsent(id, id_user, ip);
    }
}