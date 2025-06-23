import { Validators } from "../../../config";

export class CreateCohortDto {
    constructor(
        public name: string,
        public description: string,
        public department: string,
        public created_by_user_id: string,
        public is_active: boolean = true,
        public patient_count: number = 0,
    ){}

    static create(object: { [key: string]: any }): [string?, CreateCohortDto?] {
        const {
            name,
            description,
            department,
            created_by_user_id,
            is_active = true,
            patient_count = 0
        }= object;

        if (!name) return ['Missing name'];
        if (!description) return ['Missing description'];
        if (!department) return ['Missing department'];
        if (!created_by_user_id) return ['Missing created_by_user_id'];
        if (!is_active ) return ['Missing is_active'];
        if (patient_count === undefined || patient_count === null) return ['Missing patient count'];
        if (typeof name !== 'string' || name.trim() === '') return ['name must be a non-empty string'];
        if (typeof description !== 'string' || description.trim() === '') return ['description must be a non-empty string'];
        if (typeof department !== 'string' || department.trim() === '') return ['department must be a non-empty string'];
        if (Validators.uuid.test(created_by_user_id) === false) return ['created_by_user_id must be a valid UUID'];
        if (typeof is_active !== 'boolean') return ['is_active must be a boolean'];
        if (typeof patient_count !== 'number' || patient_count < 0) {
            return ['patient_count must be a non-negative number'];
        }

        return [
            undefined,
            new CreateCohortDto(
                name,
                description,
                department,
                created_by_user_id,
                is_active,
                patient_count
            )
        ]
    }
}