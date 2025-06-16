

export class UpdateRoleDto{
    private constructor(
        public id: string,
        public name: string,
        public permissions: object, 
        public description?: string,
    ){}

    get values(){
        const returnObj: {[key: string]:any} ={};
        
        if (this.name) returnObj.name = this.name;
        if (this.permissions) returnObj.permissions = this.permissions;
        if (this.description) returnObj.description = this.description;

        return returnObj;
    }

    static create(object: {[key:string]: any}): [string?, UpdateRoleDto?] {
        const { id, name, permissions, description } = object;

        if (!name) return ['Missing name'];
        if (name.length < 3) return ['Name must be at least 3 characters long'];
        if (!permissions || typeof permissions !== 'object') return ['Invalid permissions format'];

        return [
            undefined,
            new UpdateRoleDto(
                id,
                name,
                permissions,
                description
            )
        ]
    }
}