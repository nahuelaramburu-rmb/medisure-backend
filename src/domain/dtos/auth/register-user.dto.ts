import { Validators } from "../../../config";



export class RegisterUserDto{
    private constructor(
        public email: string,
        public password: string,
        public role_id: number,
        public first_name?: string,
        public last_name?: string,
        public professional_id?: string,
        public department?: string,
        public phone?: string,
    ){}

    static create( object: {[key:string]:any}): [string?, RegisterUserDto?]{
        const { email, password, role_id, first_name, last_name, professional_id, department, phone } = object;
        if(!email) return ['Missing email'];
        if(!Validators.email.test(email)) return ['Invalid email'];

        if(!password) return ['Missing password'];
        if(password.length < 12) return ['Password must be at least 12 characters long'];
        if(!Validators.password.test(password)) return ['Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'];
        
        if(!role_id) return ['Missing role_id'];

        return [
            undefined,
            new RegisterUserDto(email, password, role_id, first_name, last_name, professional_id, department, phone)
        ];
    }
}