import { CreateRoleDto, UpdateRoleDto } from '../dtos';
import { RoleEntity } from '../entities/role.entity';

export abstract class RoleRepository{
    abstract create(CreateRoleDto: CreateRoleDto): Promise<RoleEntity>;

    abstract getAll(): Promise<RoleEntity[]>;
    abstract getById(id: number): Promise<RoleEntity>;
    abstract updatedById( updateRoleDto: UpdateRoleDto): Promise<RoleEntity>;
    abstract deleteById(id: number): Promise<RoleEntity>;

}