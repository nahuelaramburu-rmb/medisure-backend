import { AuthRepository, RegisterUserDto, UserEntity, AuthDatasource } from "../../domain";


export class AuthRepositoryImpl implements AuthRepository{
    constructor(
        private readonly authDatasource: AuthDatasource
    ){}

    register( RegisterUserDto: RegisterUserDto): Promise<UserEntity>{
        return this.authDatasource.register(RegisterUserDto);
    }
}