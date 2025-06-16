
import { prisma } from "../../data/postgres";
import { CreateRoleDto, CustomError, RoleEntity, UpdateRoleDto } from "../../domain";
import { RoleDataSource } from "../../domain/datasources/role.datasource";
import { RoleMapper } from "../mappers/role.mapper";

export class RoleDataSourceImp implements RoleDataSource {


    async getAllRoles(): Promise<RoleEntity[]> {
        const roles = await prisma.roles.findMany();
        return roles.map( role => RoleEntity.fromObject(role));
    }

    async createRole(createRoleDto: CreateRoleDto): Promise<RoleEntity> {
        
        const role = await prisma.roles.create({
            data: createRoleDto!
        });
        
        return RoleMapper.RoleEntityFromObject(role); 
    }
    async getRoleById(roleId: string): Promise<RoleEntity> {
        const role = await prisma.roles.findFirst({ where: { id: roleId } });
        if (!role) throw CustomError.notFound(`Role: ${roleId}  not found`);
        return RoleEntity.fromObject(role);
    }
    async updateRole(updateRoleDto: UpdateRoleDto): Promise<RoleEntity> {
        await this.getRoleById(updateRoleDto.id);
        //TODO:name validation
        const updatedRole = await prisma.roles.update({
            where : { id : updateRoleDto.id },
            data: updateRoleDto!.values
        }); 

        return RoleEntity.fromObject(updatedRole);
    }

    async deleteRole(roleId: string): Promise<RoleEntity> {
        await this.getRoleById(roleId);
        const deleted = await prisma.roles.delete({
            where: { id: roleId }
        });
        return RoleEntity.fromObject(deleted);
    }
    
}