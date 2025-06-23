

export class CohortEntity {
    constructor(
        public name: string,
        public description: string,
        public department: string,
        public created_by_user_id: string,
        public is_active: boolean = true,
        public patient_count: number = 0,
    ){}
    static fromObject(object: { [key: string]: any }): CohortEntity {
        const {
            name,
            description,
            department,
            created_by_user_id,
            is_active = true,
            patient_count = 0
        } = object;

        if (!name) throw new Error('Missing name');
        if (!description) throw new Error('Missing description');
        if (!department) throw new Error('Missing department');
        if (!created_by_user_id) throw new Error('Missing created_by_user_id');
        if (typeof is_active !== 'boolean') throw new Error('is_active must be a boolean');
        if (typeof patient_count !== 'number' || patient_count < 0) {
            throw new Error('patient_count must be a non-negative number');
        }

        return new CohortEntity(
            name,
            description,
            department,
            created_by_user_id,
            is_active,
            patient_count
        );
    }

}