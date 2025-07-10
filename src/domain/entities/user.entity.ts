export class UserEntity {
    constructor(
        public id: string,
        public email: string,
        public password: string,
        public password_changed_at: Date,
        public role_id: string,
        public first_name: string,
        public last_name: string,
        public organization_id?: number,
        public professional_id?: string,
        public department?: string,
        public is_active: boolean = true,
        
        public last_login?: Date,
        public created_at?: Date,
        public updated_at?: Date,
    ) {}

    static fromObject(object: { [key: string]: any }): UserEntity {
        const {
            id,
            email,
            password,
            password_changed_at,
            role_id,
            first_name,
            last_name,
            organization_id,
            professional_id,
            department,
            is_active = true,
            last_login,
            created_at = new Date(),
            updated_at = new Date(),
        } = object;

        return new UserEntity(
            id,
            email,
            password,
            new Date(password_changed_at),
            role_id,
            first_name,
            last_name,
            organization_id,
            professional_id,
            department,
            is_active,
            last_login ? new Date(last_login) : undefined,
            created_at ? new Date(created_at) : undefined,
            updated_at ? new Date(updated_at) : undefined
        );
    }
}