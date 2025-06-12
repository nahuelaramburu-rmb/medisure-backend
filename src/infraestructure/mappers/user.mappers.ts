import { CustomError } from '../../domain';
import { UserEntity } from '../../domain/entities/user.entity';


export class UserMapper {
    static UserEntityFromObject(object: { [key: string]: any }) {
        const {
            id,
            email,
            password_hash,
            password_changed_at,
            role_id,
            organization_id,
            first_name,
            last_name,
            professional_id,
            department,
            phone,
            is_active,
            last_login,
            created_at,
            updated_at,
        } = object;

        if (!id) throw CustomError.badRequest('Missing Id');
        if (!email) throw CustomError.badRequest('Missing email');
        if (!password_hash) throw CustomError.badRequest('Missing password');
        if (!role_id) throw CustomError.badRequest('Missing role_id');

        return new UserEntity(
            id,
            email,
            password_hash,
            password_changed_at,
            role_id,
            first_name,
            last_name,
            organization_id,
            professional_id,
            department,
            phone,
            is_active,
            last_login,
            created_at,
            updated_at
        );
    }
}