import { AuthRepository, ChangePasswordDto, UserEntity } from "../..";



export class ChangePassword {
    constructor(
        private readonly authRepository: AuthRepository
    ){}

    async execute(changePasswordDto: ChangePasswordDto): Promise<UserEntity>{
        return this.authRepository.changePassword(changePasswordDto);
    }

}