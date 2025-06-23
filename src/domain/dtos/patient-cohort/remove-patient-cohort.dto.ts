

export class RemovePatientFromCohortDto{
    constructor(
        public cohort_id:string,
        public patient_id: string,
        public removed_at: Date = new Date(),
    ){}

    static create(obj: { [key: string]: any }): [string?, RemovePatientFromCohortDto?] {
        const { cohort_id, patient_id, removed_at } = obj;

        if (!cohort_id) return ['Missing cohort_id'];
        if (!patient_id) return ['Missing patient_id'];

        return [
            undefined,
            new RemovePatientFromCohortDto(cohort_id, patient_id, removed_at)
        ];
    }
}