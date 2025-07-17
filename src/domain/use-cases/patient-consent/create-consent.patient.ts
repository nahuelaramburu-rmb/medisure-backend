import { CreatePatientConsentDto } from "../../dtos";
import { PatientConsentEntity } from "../../entities/patient-consent.entity";
import { PatientConsentRepository } from "../../repositories/patient-consent.repository";


interface CreateConsentUseCase{
    execute(dto: CreatePatientConsentDto, id_user:string, ip:string): Promise<PatientConsentEntity>;
}

export class CreatePatientConsent implements CreateConsentUseCase {
    constructor(
        private readonly patientConsentRepository: PatientConsentRepository
    ) {}

    async execute(dto: CreatePatientConsentDto,id_user:string, ip:string): Promise<PatientConsentEntity> {
        return this.patientConsentRepository.createConsent(dto , id_user, ip);
    }
}