

export class CohortPatientEntity{
    constructor(
        public id: string,
        public cohort_id: string,
        public patient_id: string,
        public created_by_user_id: string,
        public added_at: Date,
        public removed_at?: Date,
        public notes?: string
    ){}
    static fromObject(object: { [key: string]: any }): CohortPatientEntity {
        const {
            id,
            cohort_id,
            patient_id,
            created_by_user_id,
            added_at,
            removed_at,
            notes
        } = object;

        if (!id) throw new Error('Missing id');
        if (!cohort_id) throw new Error('Missing cohort_id');
        if (!patient_id) throw new Error('Missing patient_id');
        if (!created_by_user_id) throw new Error('Missing created_by_user_id');
        if (!added_at) throw new Error('Missing added_at');
        if (notes && typeof notes !== 'string') throw new Error('notes must be a string');

        const newAddedAt = new Date(added_at);
        if (isNaN(newAddedAt.getTime())) throw new Error('added_at must be a valid date');

        let newRemovedAt;
        if (removed_at) {
            newRemovedAt = new Date(removed_at);
            if (isNaN(newRemovedAt.getTime())) throw new Error('removed_at must be a valid date');
        }

        return new CohortPatientEntity(
            id,
            cohort_id,
            patient_id,
            created_by_user_id,
            newAddedAt,
            newRemovedAt,
            notes
        );
    }
}