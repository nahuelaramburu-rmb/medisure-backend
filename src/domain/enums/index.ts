export enum Gender{
    Male = 'male',
    Female = 'female',
    Other = 'other',
    Unknown = 'unknown'
}

export enum BloodType{
    Apositive = 'A+',
    Anegative = 'A-',
    Bpositive = 'B+',
    Bnegative = 'B-',
    ABpositive = 'AB+',
    ABnegative = 'AB-',
    Opositive = 'O+',
    Onegative = 'O-',
}

export enum AppointmentType {
    Initial = 'initial',
    FollowUp = 'follow-up',
    Procedure = 'procedure',
    Emergency = 'emergency',
    Telemedicine = 'telemedicine',
}

export enum AppointmentStatusType {
    Scheduled = 'scheduled',
    Confirmed = 'confirmed',
    Completed = 'completed',
    Cancelled = 'cancelled',
    NoShow = 'no_show'
}

export enum RecordType{
    Diagnosis = 'diagnosis',
    Medocation = 'medication',
    Procedure = 'procedure',
    LabResult = 'lab_result',
    VitalSigns = 'vital_signs',
    Allergy = 'allergy',
    Immunization = 'immunization',
}

export enum DocumentType {
    MedicalRecord = 'medical_report',
    LabReport = 'lab_report',
    Imaging = 'imaging',
    ClinicalNote = 'clinical_note',
    DischargeSummary = 'discharge_summary',
    Prescription = 'prescription',
    Other = 'other',
}

export enum DocumentFileType{
    PDF = 'pdf',
    Docx = 'docx',
    Txt = 'txt',
    Jpg = 'jpg',
    Jpeg = 'jpeg',
    Png = 'png',
    Dicom = 'dicom',
}

export enum DocumentStatusValidType{
    Pending = 'pending',
    Processing = 'processing',
    Completed = 'completed',
    Failed = 'failed',
}

export enum ActionType{
    Create = 'create',
    Update = 'update',
    Delete = 'delete',
    Read = 'read',
    Export = 'export',
    Verify = 'verify',
}

export enum SeverityLevel {
    Mild = 'mild',
    Moderate = 'moderate',
    Severe = 'severe'
}