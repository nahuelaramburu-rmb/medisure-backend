import { RoleEntity } from "../entities/role.entity";
import { CreateRoleDto } from '../dtos/roles/create-role.dto';
import { UpdateRoleDto } from "..";

export abstract class RoleDataSource{

    abstract createRole(createRoleDto: CreateRoleDto): Promise<RoleEntity>;
    //abstract getRoleById(roleId: number): Promise<any>;
    //abstract updateRole(roleId: number, roleData: any): Promise<any>;
    //abstract deleteRole(roleId: number): Promise<any>;
    abstract getAllRoles(): Promise<RoleEntity[]>;
    abstract getRoleById(id: number):Promise<RoleEntity>;
    abstract updateRole(updateRoleDto: UpdateRoleDto) :Promise<RoleEntity>;
    abstract deleteRole( id: number): Promise<RoleEntity>;
}