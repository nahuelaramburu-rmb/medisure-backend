import { CreateRoleDto, RoleDataSource, RoleEntity, RoleRepository, UpdateRoleDto } from '../../domain';


export class RoleRepositoryImpl implements RoleRepository {
    constructor(
        private readonly roleDatasource: RoleDataSource
    ){}
    create(CreateRoleDto: CreateRoleDto): Promise<RoleEntity>{
        return this.roleDatasource.createRole(CreateRoleDto);
    }
    getAll(): Promise<RoleEntity[]> {
        return this.roleDatasource.getAllRoles();
    }
    getById(id: string): Promise<RoleEntity> {
        return this.roleDatasource.getRoleById(id);
    }
    updatedById(updateRoleDto: UpdateRoleDto): Promise<RoleEntity> {
        return this.roleDatasource.updateRole(updateRoleDto);
    }
    deleteById(id: string): Promise<RoleEntity> {
        return this.roleDatasource.deleteRole(id);
    }
    
}