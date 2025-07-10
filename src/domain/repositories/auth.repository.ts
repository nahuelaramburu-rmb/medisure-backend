import { CreateAuditLogsDto } from '../dtos';
import { ChangePasswordDto } from '../dtos/auth/change-password.dto';
import { LoginUserDto } from '../dtos/auth/login-user.dto';
import { RegisterUserDto } from '../dtos/auth/register-user.dto';
import { AuditLogsEntity } from '../entities/audit-logs.entity';
import { UserEntity } from '../entities/user.entity';


export abstract class AuthRepository{
    abstract getUsers():Promise<UserEntity[]>
    abstract login(LoginUserDto: LoginUserDto, ip:string):Promise<UserEntity>
    abstract register(registerUserDto: RegisterUserDto):Promise<UserEntity>
    abstract changePassword(changePasswordDto: ChangePasswordDto):Promise<UserEntity>
    abstract createAuditLog( createAuditLogDto: CreateAuditLogsDto): Promise<AuditLogsEntity>
    abstract validateEmail( token: string):Promise<boolean>
}
