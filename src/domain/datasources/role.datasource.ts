import { CreateRoleDto, RoleEntity, UpdateRoleDto } from "..";

export abstract class RoleDataSource{

    abstract createRole(createRoleDto: CreateRoleDto): Promise<RoleEntity>;
    abstract getAllRoles(): Promise<RoleEntity[]>;
    abstract getRoleById(id: string):Promise<RoleEntity>;
    abstract updateRole(updateRoleDto: UpdateRoleDto) :Promise<RoleEntity>;
    abstract deleteRole( id: string): Promise<RoleEntity>;
}