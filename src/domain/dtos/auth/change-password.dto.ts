

export class ChangePasswordDto {
    private constructor(
        public email: string,
        public oldPassword: string,
        public newPassword: string
    ){}

    static create( object: {[key:string]: any }): [string?, ChangePasswordDto?]{
        const { email, oldPassword, newPassword } = object;
        if(!email) return ['Missing email'];
        if(!oldPassword) return ['Missing old password'];
        if(!newPassword) return ['Missing new password'];
        if(newPassword.length <= 12) return ['New password must be at least 6 characters long'];
        return [
            undefined,
            new ChangePasswordDto(email, oldPassword, newPassword)
        ]
    }
}