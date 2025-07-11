import { AccessLogEntity } from "../../entities/access-log.entity";
import { PatientConsentEntity } from "../../entities/patient-consent.entity";
import { PatientConsentRepository } from "../../repositories/patient-consent.repository";


interface GetLogAccessByPatientUseCase {
    execute(patientId: string): Promise<AccessLogEntity[]>;
}

export class GetLogAccessByPatient implements GetLogAccessByPatientUseCase {
    constructor(
        private readonly patientConsentRepository: PatientConsentRepository
    ) {}

    async execute(patientId: string): Promise<AccessLogEntity[]> {
        if (!patientId) {
            throw new Error("Patient ID is required");
        }
        return this.patientConsentRepository.getConsentLogsByPatient(patientId);
    }
}