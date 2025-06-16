

import { RoleEntity } from "../../entities/role.entity";
import { RoleRepository } from "../../repositories/role.repository";


export interface DeleteRoleUseCase {
    execute(id: string): Promise<RoleEntity>;
}

export class DeleteRole implements DeleteRoleUseCase{
    constructor(
        private readonly roleRepository: RoleRepository,
    ){}

    execute(id: string): Promise<RoleEntity> {
        return this.roleRepository.deleteById(id);
    }

}