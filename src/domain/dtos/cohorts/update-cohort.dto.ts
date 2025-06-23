import { Validators } from "../../../config";

export class UpdateCohortDto {
    constructor(
        public id:string,
        public name?: string,
        public description?: string,
        public department?: string,
        public created_by_user_id?: string,
        public is_active: boolean = true,
        public patient_count: number = 0,
    ){}

    get values(){
        const returnObj: { [key: string]: any } = {};
        if (this.id) returnObj.id = this.id;
        if (this.name) returnObj.name = this.name;
        if (this.description) returnObj.description = this.description;
        if (this.department) returnObj.department = this.department;
        if (this.created_by_user_id) returnObj.created_by_user_id = this.created_by_user_id;
        if (this.is_active !== undefined) returnObj.is_active = this.is_active;
        if (this.patient_count !== undefined && this.patient_count !== null) returnObj.patient_count = this.patient_count;
        return returnObj;
    }
    static create(object: { [key: string]: any }): [string?, UpdateCohortDto?] {
        const {
            id,
            name,
            description,
            department,
            created_by_user_id,
            is_active = true,
            patient_count = 0
        }= object;

        
        if (name && typeof name !== 'string' || name.trim() === '') return ['name must be a non-empty string'];
        if (description && typeof description !== 'string' || description.trim() === '') return ['description must be a non-empty string'];
        if (department && typeof department !== 'string' || department.trim() === '') return ['department must be a non-empty string'];
        if (created_by_user_id && Validators.uuid.test(created_by_user_id) === false) return ['created_by_user_id must be a valid UUID'];
        if (is_active && typeof is_active !== 'boolean') return ['is_active must be a boolean'];
        if (patient_count &&typeof patient_count !== 'number' || patient_count < 0) {
            return ['patient_count must be a non-negative number'];
        }

        return [
            undefined,
            new UpdateCohortDto(
                id,
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