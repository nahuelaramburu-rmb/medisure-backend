

export class UserEntity{
    constructor(
        public id: string,
        public full_name: string,
        public email: string,
        public password: string,
        public role: string[],
        public createdAt: Date,
        public department_clinic: string,
        public passwordChangedAt?: Date,
    ){}
}