import { JwtAdapter } from "../../../config";
import { LoginUserDto } from "../../dtos/auth/login-user.dto";
import { AuthRepository } from '../../repositories/auth.repository';
import { UserEntity } from '../../entities/user.entity';
import { ActionType } from "../../enums";
import { CustomError } from "../../errors/custom.error";

interface UserToken {
    msg:string;
    token: string;
    user: {
        id: string;
        full_name: string;
        email: string;
    };
}

interface LoginUseUseCase {
    execute(LoginUserDto: LoginUserDto, ip: string): Promise<UserToken>
}

type SignToken = (payload: Object, duration?: number) => Promise<string | null>;

export class LoginUser implements LoginUseUseCase {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly signedToken: SignToken = JwtAdapter.generateToken,
    ) { }
    async execute(LoginUserDto: LoginUserDto, ip: string): Promise<UserToken> {

        const user = await this.authRepository.login(LoginUserDto, ip);

        if (this.checkPasswordExpiration(user)) throw new Error("Password expired, please change your password.");

        const token = await this.signedToken({ id: user.id }, 1800); // 30 minutes
        if (!token) {
            throw new Error("Failed to generate token");
        }
        console.log({
            user_id: user.id,
            action: ActionType.Read,
            entity_type: 'users',
            entity_id: user.id,
            changes: { action: 'login' },
            ip_address: ip,
        });
        try {
            await this.authRepository.createAuditLog({
                user_id: user.id,
                action: ActionType.Read,
                entity_type: 'users',
                entity_id: user.id,
                changes: { action: 'login' },
                ip_address: ip,
            })
        } catch (error) {
            console.error('Prisma error:', error);  
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServerError();
        }


        return {
            msg:'ok',
            token: token,
            user: {
                id: user.id,
                full_name: user.first_name + ' ' + user.last_name,
                email: user.email
            }
        }
    }
    private checkPasswordExpiration({ password_changed_at, created_at }: UserEntity): boolean {
        const MAXDAYS = 90;
        const lastChange = password_changed_at ?? created_at ?? null;
        const daysSinceChange = (Date.now() - new Date(lastChange).getTime()) / (1000 * 60 * 60 * 24);

        return daysSinceChange > MAXDAYS;
    }
}