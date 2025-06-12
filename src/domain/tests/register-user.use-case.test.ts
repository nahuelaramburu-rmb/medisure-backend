import { RegisterUserDto } from "../dtos/auth/register-user.dto"



describe ('RegisterUser UseCase',()=>{
    it('should reject if password is less than 12 characters', async ()=>{
        const [error, userDto] = RegisterUserDto.create({
            email: "test@mail.com",
            password: "Shortingi1*", // 11 characters
            role_id: 1,
            first_name: "Test",
            last_name: "User"
        });
        expect(error).toBe('Password must be at least 12 characters long');
        expect(userDto).toBeUndefined();
    });
    it('should reject if password does not meet complexity requirements', async ()=>{
        const [error, userDto] = RegisterUserDto.create({
            email: "test@mail.com",
            password: "simplepassword",
            role_id: 1,
            first_name: "Test",
            last_name: "User"
        });
        expect(error).toBe('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character');
        expect(userDto).toBeUndefined();
    });
    it('should create a valid password',()=>{
        const [error, dto]=RegisterUserDto.create({
            email: 'test@mail.com',
            password: 'Valid1@Password',
            role_id: 1,
            first_name: "Test",
            last_name: "User"
        });
        expect(error).toBeUndefined();
        expect(dto).toBeInstanceOf(RegisterUserDto);
    });
});