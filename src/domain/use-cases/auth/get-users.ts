import { UserEntity } from "../../entities/user.entity";
import { AuthRepository } from "../../repositories/auth.repository";



interface GetUsersUseCase{
    execute(): Promise<UserEntity[]>;
}

export class GetUsers implements GetUsersUseCase{
    constructor(
        private readonly authRepository: AuthRepository
    ){}
    execute(): Promise<UserEntity[]> {
        return this.authRepository.getUsers();
    }
    
}