import { ActionType, AuthDatasource, ChangePasswordDto, CreateAuditLogsDto, CustomError, LoginUserDto, RegisterUserDto, UserEntity } from '../../domain';
import { UserMapper } from '../mappers/user.mappers';
import { BcryptAdapter, envs, JwtAdapter } from '../../config';
import { prisma } from '../../data/postgres';
import { AuditLogsEntity } from '../../domain/entities/audit-logs.entity';
import { EmailService } from '../../presentation/services/email.service';

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;

export class AuthPrismaDatasource implements AuthDatasource {
    constructor(
        private readonly hashPassword: HashFunction = BcryptAdapter.hash,
        private readonly comparePassword: CompareFunction = BcryptAdapter.compare,
        private readonly emailService: EmailService = new EmailService(envs.MAILER_SERVICE, envs.MAILER_EMAIL, envs.MAILER_SECRET_KEY)
    ) { }


    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        let { email, password, role_id, department, first_name, last_name, professional_id } = registerUserDto;
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
            const user = await prisma.users.create({
                data: {
                    email,
                    password_hash: hashedPassword,
                    role_id,
                    department,
                    first_name,
                    last_name,
                    professional_id,
                    password_changed_at: new Date(),
                }
            });
            // 6. Send email validation link
            await this.sendEmailValidationLink(email);

            return UserMapper.UserEntityFromObject(user);
        } catch (error) {
            console.error(error);
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServerError();
        }
    }

    async login(loginUserDto: LoginUserDto, ip: string): Promise<UserEntity> {
        const { email, password } = loginUserDto;
        try {
            // 1. Verify if the user exists
            const user = await prisma.users.findUnique({ where: { email } });
            if (!user) throw CustomError.badRequest('Credentials error');
            // 2. Compare the password
            const isValid = this.comparePassword(password, user.password_hash);
            if (!isValid) throw CustomError.badRequest('Credentials error');
            // 3. Create an audit log
            await this.createAuditLog({
                user_id: user.id,
                action: ActionType.Read,
                entity_type: 'users',
                entity_id: user.id,
                changes: { action: 'login' },
                ip_address: ip,
            });
            // 4. Return the user entity
            return UserMapper.UserEntityFromObject(user);
        } catch (error) {
            console.error('Prisma error original:', error); // <-- Esto es clave
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
                    password_changed_at: new Date(),
                }
            });
            return UserMapper.UserEntityFromObject(updatedUser);
        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServerError();
        }
    }

    async createAuditLog(createAuditLogsDto: CreateAuditLogsDto): Promise<AuditLogsEntity> {
        try {
            

            const createdAuditLog = await prisma.audit_logs.create({
                data: createAuditLogsDto!
            });

            return AuditLogsEntity.fromObject(createdAuditLog);
        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServerError(`Failed to create audit log: ${error}`);
        }

    }

    private sendEmailValidationLink = async (email: string) => {
        const token = await JwtAdapter.generateToken({ email });
        if (!token) throw CustomError.internalServerError('Failed to generate token');
        const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`;
        const html = `
            <p>Click the link below to validate your email:</p>
            <a href="${link}">Validate Email: ${email}</a>
        `;
        const options = {
            to: email,
            subject: 'Email Validation',
            htmlBody: html,
        }

        const isSent = await this.emailService.sendEmail(options);
        if (!isSent) throw CustomError.internalServerError('Failed to send email');
        return true;
    }

    public validateEmail = async (token: string) => {
        const payload = await JwtAdapter.validateToken(token);
        if (!payload) throw CustomError.unauthorized('Invalid token');

        const { email } = payload as { email: string };
        if (!email) throw CustomError.internalServerError('Invalid email payload');

        const user = await prisma.users.findUnique({ where: { email } });
        if (!user) throw CustomError.notFound('User not found');

        //TODO: change the user status to 'active'
        return true;
    }
}