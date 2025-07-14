import { prisma } from "../../data/postgres";
import { UserDatasource, UserEntity } from "../../domain";
import { UserMapper } from "../mappers/user.mappers";

export class UserDatasourceImpl  implements UserDatasource{
    async getUsers(): Promise<UserEntity[]> {
            const users = await prisma.users.findMany();
            return users.map(user => UserMapper.UserEntityFromObject(user));
        }
    
    async getUserByUserName(user_name: string): Promise<UserEntity> {
        const user = await prisma.users.findUnique({
            where: { user_name}
        })
        if (!user) throw new Error('User not found');
        return UserMapper.UserEntityFromObject(user);
    }
    
}