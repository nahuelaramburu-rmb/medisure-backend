import { AuthRepository, RegisterUserDto, LoginUserDto, UserEntity, AuthDatasource, ChangePasswordDto, CreateAuditLogsDto } from "../../domain";
import { AuditLogsEntity } from "../../domain/entities/audit-logs.entity";


export class AuthRepositoryImpl implements AuthRepository{
    constructor(
        private readonly authDatasource: AuthDatasource
    ){}
    
    register( RegisterUserDto: RegisterUserDto): Promise<UserEntity>{
        return this.authDatasource.register(RegisterUserDto);
    }
    login(LoginUserDto: LoginUserDto): Promise<UserEntity>{
        return this.authDatasource.login(LoginUserDto);
    }
    changePassword( ChangePasswordDto: ChangePasswordDto): Promise<UserEntity>{
        return this.authDatasource.changePassword(ChangePasswordDto);
    }
    createAuditLog(createAuditLogDto: CreateAuditLogsDto): Promise<AuditLogsEntity> {
        return this.authDatasource.createAuditLog(createAuditLogDto);
    }

}