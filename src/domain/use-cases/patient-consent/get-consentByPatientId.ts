import { PatientConsentEntity } from "../../entities/patient-consent.entity";
import { PatientConsentRepository } from "../../repositories/patient-consent.repository";


interface GetPatientConsentUseCase{
    execute(patientId: string): Promise<PatientConsentEntity[]>;
}

export class GetConsentsByPatientId implements GetPatientConsentUseCase {
    constructor(
        private readonly patientConsentRepository: PatientConsentRepository
    ) {}

    async execute(patientId: string): Promise<PatientConsentEntity[]> {
        if (!patientId) {
            throw new Error("Patient ID is required");
        }
        return this.patientConsentRepository.getConsentByIdPatient(patientId);
    }
}