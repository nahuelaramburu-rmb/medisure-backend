

export class CreatePatientCohortDto{
    constructor(
        public cohort_id: string,
        public patient_id: string,
        public added_by_user_id: string,
        public added_at?: Date,
        //removed ad
        public notes?: string,
    ){}
    static create(object: { [key: string]: any }): [string?, CreatePatientCohortDto?] {
        const {
            cohort_id,
            patient_id,
            added_by_user_id,
            added_at,
            notes
        } = object;

        if (!cohort_id) return ['Missing cohort_id'];
        if (!patient_id) return ['Missing patient_id'];
        if (!added_by_user_id) return ['Missing added_by_user_id'];
        const newAddedAt = new Date(added_at);
        if (isNaN(newAddedAt.getTime())) throw new Error('added_at must be a valid date');

        if (notes && typeof notes !== 'string') return ['notes must be a string'];

        return [
            undefined,
            new CreatePatientCohortDto(
                cohort_id,
                patient_id,
                added_by_user_id,
                newAddedAt,
                notes
            )
        ];
    }
}