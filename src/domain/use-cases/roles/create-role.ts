import { CreateRoleDto } from "../../dtos/roles/create-role.dto";
import { RoleEntity } from "../../entities/role.entity";
import { CustomError } from "../../errors/custom.error";
import { RoleRepository } from "../../repositories/role.repository";


export interface CreateRoleUseCase {
    execute(createRoleDto: CreateRoleDto): Promise<RoleEntity>;
}

export class CreateRole implements CreateRoleUseCase{
    constructor(
        private readonly roleRepository: RoleRepository,
    ){}

    execute(createRoleDto: CreateRoleDto): Promise<RoleEntity> {
        return this.roleRepository.create(createRoleDto);
    }

}