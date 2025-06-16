import { Validators } from "../../../config";



export class RegisterUserDto{
    private constructor(
        public email: string,
        public password: string,
        public role_id: string,
        public first_name: string,
        public last_name: string,
        public password_changed_at: Date,
        public is_active: boolean = true,
        public professional_id?: string,
        public department?: string,
        public last_login?: Date,
    ){}

    static create( object: {[key:string]:any}): [string?, RegisterUserDto?]{
        const { email, password, role_id, first_name, last_name, professional_id, department, is_active, last_login } = object;
        
        if(!email) return ['Missing email'];
        if(!Validators.email.test(email)) return ['Invalid email'];

        if(!password) return ['Missing password'];
        if(password.length < 12) return ['Password must be at least 12 characters long'];
        if(!Validators.password.test(password)) return ['Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'];
        
        if(!role_id) return ['Missing role_id'];
        if(!first_name) return ['Missing first_name'];
        if(!last_name) return ['Missing last_name'];

        return [
            undefined,
            new RegisterUserDto(
                email,
                password,
                role_id,
                first_name,
                last_name,
                new Date(), // password_changed_at
                is_active ?? true,
                professional_id,
                department,
                last_login
            )
        ];
    }
}