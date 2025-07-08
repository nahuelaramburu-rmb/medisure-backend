// src/domain/dtos/medical-records/medical-record-alert.dto.ts
export class MedicalRecordAlertDto {
    constructor(
        public medicalRecordId: string,
        public previousSeverity: string | null,
        public currentSeverity: string,
        public patientId: string,
        public userId: string
    ) {}

    static create(object: { [key: string]: any }): [string?, MedicalRecordAlertDto?] {
        const { medicalRecordId, previousSeverity, currentSeverity, patientId, userId } = object;
        
        if (!medicalRecordId) return ['Missing medicalRecordId'];
        if (!currentSeverity) return ['Missing currentSeverity'];
        if (!patientId) return ['Missing patientId'];
        if (!userId) return ['Missing userId'];

        return [undefined, new MedicalRecordAlertDto(
            medicalRecordId, 
            previousSeverity, 
            currentSeverity, 
            patientId, 
            userId
        )];
    }
}

