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