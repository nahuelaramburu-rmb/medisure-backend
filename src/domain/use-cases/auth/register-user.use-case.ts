import { JwtAdapter } from "../../../config";
import { RegisterUserDto } from "../../dtos/auth/register-user.dto";
import { CustomError } from "../../errors/custom.error";
import { AuthRepository } from "../../repositories/auth.repository";

interface UserToken{
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
}

interface RegisterUserUseCase {
    execute(registerUserDto: RegisterUserDto) : Promise<UserToken>
}

type SignToken = (payload: Object, duration?: number)=> Promise<string|null>;

export class RegisterUser implements RegisterUserUseCase {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly signedToken: SignToken = JwtAdapter.generateToken,
    ){}


    async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {
        //create user 
        const user = await this.authRepository.register(registerUserDto);
        //token
        const token = await this.signedToken({ id: user.id}, 1800); // 30 minutes
        if (!token) {
            throw CustomError.internalServerError("Failed to generate token");
        }
        return {
            token: token, 
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        };
    }
}