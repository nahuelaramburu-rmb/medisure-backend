import { Validators } from "../../../config";


export class LoginUserDto{
    private constructor(
        public email: string,
        public password: string
    ){}

    static create( object: {[key:string]:any}): [string?, LoginUserDto?]{
        const { email, password } = object;
        if(!email) return ['Missing email'];
        if(!Validators.email.test(email)) return ['Invalid email'];
        if(!password) return ['Missing password'];
        if(password.length <= 12) return ['Password must be at least 12 characters long'];

        return [
            undefined, //error
            new LoginUserDto(email, password)
        ];
    }

}