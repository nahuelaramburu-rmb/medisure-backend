import { PatientConsentEntity } from "../../entities/patient-consent.entity";
import { PatientConsentRepository } from "../../repositories/patient-consent.repository";

interface RevokeConsentUseCase {
    execute(id: string, revokeDate?: Date): Promise<PatientConsentEntity>;
}
export class RevokeConsent implements RevokeConsentUseCase {
    constructor(
        private readonly patientConsentRepository: PatientConsentRepository
    ) {}

    async execute(id: string, revokeDate?: Date): Promise<PatientConsentEntity> {
        if (!id) {
            throw new Error("Consent ID is required");
        }
        return this.patientConsentRepository.revokeConsent(id, revokeDate);
    }
}