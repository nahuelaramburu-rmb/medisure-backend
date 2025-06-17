
import { RoleEntity } from "../../entities/role.entity";
import { RoleRepository } from "../../repositories/role.repository";


export interface GetRolesUseCase {
    execute(): Promise<RoleEntity[]>;
}

export class GetRoles implements GetRolesUseCase{
    constructor(
        private readonly roleRepository: RoleRepository,
    ){}

    execute(): Promise<RoleEntity[]> {
        return this.roleRepository.getAll();
    }

}