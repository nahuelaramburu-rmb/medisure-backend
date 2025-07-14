import { UserEntity, UserRepository } from "../../domain";


export class UserRepositoryImpl implements UserRepository{
    constructor(
        private readonly datasource: UserRepository
    ){}

    getUsers(): Promise<UserEntity[]> {
        return this.datasource.getUsers();
    }

    getUserByUserName(user_name: string): Promise<UserEntity> {
        return this.datasource.getUserByUserName(user_name);
    }
}