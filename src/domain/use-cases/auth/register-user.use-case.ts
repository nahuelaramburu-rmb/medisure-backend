import { JwtAdapter } from "../../../config";
import { RegisterUserDto } from "../../dtos/auth/register-user.dto";
import { CustomError } from "../../errors/custom.error";
import { AuthRepository } from "../../repositories/auth.repository";

interface UserToken{
    token: string;
    user: {
        id: string;
        email: string;
        role_id: string;
        first_name: string;
        last_name: string;
        profesional_id:string;
        department: string;
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
                email: user.email,
                role_id: user.role_id,
                first_name: user.first_name,
                last_name: user.last_name,
                profesional_id: user.professional_id ?? "",
                department: user.department ?? ""

            }
        };
    }
}