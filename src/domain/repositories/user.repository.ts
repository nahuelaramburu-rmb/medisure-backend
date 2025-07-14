import { UserEntity } from "../entities/user.entity";



export abstract class UserRepository{
    abstract getUsers(): Promise<UserEntity[]>;
    abstract getUserByUserName(user_name: string): Promise<UserEntity>;
}