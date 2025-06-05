import { JwtAdapter } from "../../../config";
import { LoginUserDto } from "../../dtos/auth/login-user.dto";
import { AuthRepository } from '../../repositories/auth.repository';

interface UserToken{
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
}

interface LoginUseUseCase{
    execute(LoginUserDto: LoginUserDto): Promise<UserToken>
}

type SignToken = (payload: Object, duration?: number) => Promise<string | null>;

export class LoginUser implements LoginUseUseCase {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly signedToken: SignToken = JwtAdapter.generateToken,
    ){}
    async execute(LoginUserDto: LoginUserDto): Promise<UserToken> {
        const MAXDAYS = 90; // Maximum days before password expiration

        //create user
        const user = await this.authRepository.login(LoginUserDto);
        // check if password user has changed
        const lastChange = user.passwordChangedAt ?? user.createdAt ?? null;

        const daysSinceChange = (Date.now() - new Date(lastChange).getTime()) / (1000 * 60 * 60 * 24);
        
        if (daysSinceChange > MAXDAYS) throw new Error("Password expired, please change your password.");
        //generate token
        const token = await this.signedToken({ id: user.id }, 1800); // 30 minutes
        if (!token) {
            throw new Error("Failed to generate token");
        }

        return {
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        }
    }
}