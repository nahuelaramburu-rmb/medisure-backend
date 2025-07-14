
import { UserEntity } from "../../entities/user.entity";
import { UserRepository } from "../../repositories/user.repository";



interface GetUsersByUserNameUseCase{
    execute(user_name: string): Promise<UserEntity>;
}

export class GetUsersByUserName implements GetUsersByUserNameUseCase{
    constructor(
        private readonly repository: UserRepository
    ){}
    execute(user_name:string): Promise<UserEntity> {
        return this.repository.getUserByUserName(user_name);
    }
    
}