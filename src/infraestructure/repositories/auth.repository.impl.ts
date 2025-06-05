import { AuthRepository, RegisterUserDto, LoginUserDto, UserEntity, AuthDatasource, ChangePasswordDto } from "../../domain";


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
}