import { Validators } from "../../../config";



export class RegisterUserDto{
    private constructor(
        public name: string,
        public email: string,
        public password: string,
        public role: string[] = ['user'],
        public img?: string
    ){}

    static create( object: {[key:string]:any}): [string?, RegisterUserDto?]{
        const { name, email, password } = object;
        if(!name ) return ['Missing name'];
        if(!email) return ['Missing email'];
        if(!Validators.email.test(email)) return ['Invalid email'];

        if(!password) return ['Missing password'];
        if(password.length <= 12) return ['Password must be at least 12 characters long'];
        if(!Validators.password.test(password)) return ['Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'];

        return [
            undefined,
            new RegisterUserDto(name, email, password)
        ];
    }
}