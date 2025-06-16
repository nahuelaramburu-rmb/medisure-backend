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
}