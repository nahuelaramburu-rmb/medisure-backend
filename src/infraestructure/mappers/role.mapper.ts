import { CustomError, RoleEntity } from "../../domain";

 
export class RoleMapper {
  static RoleEntityFromObject(object: { [key: string]: any }): RoleEntity {
    const { id, name, description, permissions, createdAt } = object;
    
    if (!id) throw new Error('Missing Id');
    if (!name) throw new Error('Missing name');
    if (!permissions || typeof permissions !== 'object') throw CustomError.badRequest('Invalid permissions format');
    return new RoleEntity(
      id,
      name,
      description,
      permissions,
      createdAt,
      
    );
  }
}