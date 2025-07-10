import { ChangePasswordDto } from '../dtos/auth/change-password.dto';
import { LoginUserDto } from '../dtos/auth/login-user.dto';
import { RegisterUserDto } from '../dtos/auth/register-user.dto';
import { UserEntity } from '../entities/user.entity';
import { create } from 'domain';
import { CreateAuditLogsDto } from '../dtos/auth/create-audit.logs.dto';
import { AuditLogsEntity } from '../entities/audit-logs.entity';


export abstract class AuthDatasource{
    abstract getUsers():Promise<UserEntity[]>
    abstract login(loginUserDto: LoginUserDto, ip:string):Promise<UserEntity>
    abstract register(registerUserDto: RegisterUserDto):Promise<UserEntity>
    abstract changePassword(changePasswordDto: ChangePasswordDto):Promise<UserEntity>
    abstract createAuditLog(createAuditLogsDto: CreateAuditLogsDto): Promise<AuditLogsEntity>
    abstract validateEmail(token: string):Promise<boolean>
}