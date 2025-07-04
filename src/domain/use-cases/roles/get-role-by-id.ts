import { UpdateRoleDto } from "../../dtos";
import { CreateRoleDto } from "../../dtos/roles/create-role.dto";
import { RoleEntity } from "../../entities/role.entity";
import { RoleRepository } from "../../repositories/role.repository";


export interface GetRoleByIdUseCase {
    execute(id: string): Promise<RoleEntity>;
}

export class GetRoleById implements GetRoleByIdUseCase{
    constructor(
        private readonly roleRepository: RoleRepository,
    ){}

    execute(id: string): Promise<RoleEntity> {
        return this.roleRepository.getById(id);
    }

}