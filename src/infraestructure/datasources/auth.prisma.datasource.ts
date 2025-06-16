import { AuthDatasource, ChangePasswordDto, CustomError, LoginUserDto, RegisterUserDto, UserEntity } from '../../domain';
import { UserMapper } from '../mappers/user.mappers';
import { BcryptAdapter } from '../../config';
import { prisma } from '../../data/postgres';

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;

export class AuthPrismaDatasource implements AuthDatasource {
    constructor(
        private readonly hashPassword: HashFunction = BcryptAdapter.hash,
        private readonly comparePassword: CompareFunction = BcryptAdapter.compare
    ) { }

    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        let { email, password, role_id, department, first_name, last_name, professional_id  } = registerUserDto;
        try {
            // 1. Verify if the user already exists
            const exist = await prisma.users.findUnique({ where: { email } });
            if (exist) throw CustomError.badRequest('Credentials error');
            // 2. If no roleId is provided, assign the default role 'user_rol'
            if (!role_id) {
                const defaultRole = await prisma.roles.findUnique({ where: { name: 'user_rol' } });
                if (!defaultRole) throw CustomError.internalServerError('Default role not found');
                role_id = defaultRole.id;
            }
            // 3. Valida que el rol existe
            const role = await prisma.roles.findUnique({ where: { id: role_id } });
            if (!role) throw CustomError.badRequest('Role does not exist');
            // 4. Hash the password
            const hashedPassword = this.hashPassword(password);
            // 5. Create the user
            console.log(email)
            const user = await prisma.users.create({
                data: {
                    email,
                    password_hash: hashedPassword,
                    role_id,
                    department,
                    first_name,
                    last_name,
                    professional_id,
                    password_changed_at: new Date(), // <-- fecha de primer cambio de contraseña
                }
            });
            return UserMapper.UserEntityFromObject(user);
        } catch (error) {
            console.error(error);
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServerError();
        }
    }

    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        const { email, password } = loginUserDto;
        try {
            // 1. Verify if the user exists
            const user = await prisma.users.findUnique({ where: { email } });
            if (!user) throw CustomError.badRequest('Credentials error');
            // 2. Compare the password
            const isValid = this.comparePassword(password, user.password_hash);
            if (!isValid) throw CustomError.badRequest('Credentials error');
            // 3. Map the DTO to an entity
            return UserMapper.UserEntityFromObject(user);
        } catch (error) {
            console.error(error);
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServerError();
        }
    }

    async changePassword(changePasswordDto: ChangePasswordDto): Promise<UserEntity> {
        const { email, oldPassword, newPassword } = changePasswordDto;
        try {
            const user = await prisma.users.findUnique({ where: { email } });
            if (!user) throw CustomError.badRequest('Credentials error');
            // 1. Compare the old password
            const isValid = this.comparePassword(oldPassword, user.password_hash);
            if (!isValid) throw CustomError.badRequest('Credentials error');
            // 2. Hash the new password
            const hashedNewPassword = this.hashPassword(newPassword);
            // 3. Update the user
            const updatedUser = await prisma.users.update({
                where: { email },
                data: {
                    password_hash: hashedNewPassword,
                    password_changed_at: new Date(), // Assuming you want to track when the password was changed
                }
            });
            return UserMapper.UserEntityFromObject(updatedUser);
        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServerError();
        }
    }
}