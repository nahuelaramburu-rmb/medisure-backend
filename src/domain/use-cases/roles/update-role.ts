import { UpdateRoleDto } from "../../dtos";
import { RoleEntity } from "../../entities/role.entity";
import { RoleRepository } from "../../repositories/role.repository";


export interface UpdateRoleUseCase {
    execute(updateRoleDto: UpdateRoleDto): Promise<RoleEntity>;
}

export class UpdateRole implements UpdateRoleUseCase{
    constructor(
        private readonly roleRepository: RoleRepository,
    ){}

    execute(updateRoleDto: UpdateRoleDto): Promise<RoleEntity> {
        return this.roleRepository.updatedById(updateRoleDto);
    }

}