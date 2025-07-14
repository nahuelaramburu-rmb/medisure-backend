import { UserEntity } from "../../entities/user.entity";
import { UserRepository } from "../../repositories/user.repository";



interface GetUsersUseCase{
    execute(): Promise<UserEntity[]>;
}

export class GetUsers implements GetUsersUseCase{
    constructor(
        private readonly repository: UserRepository
    ){}
    execute(): Promise<UserEntity[]> {
        return this.repository.getUsers();
    }
    
}