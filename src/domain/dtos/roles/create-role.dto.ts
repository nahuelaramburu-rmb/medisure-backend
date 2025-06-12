

export class CreateRoleDto{
    private constructor(
        public name: string,
        public permissions: object, 
        public description?: string,
    ){}
    static create(object: {[key:string]: any}): [string?, CreateRoleDto?] {
        const { name, permissions, description } = object;

        if (!name) return ['Missing name'];
        if (name.length < 3) return ['Name must be at least 3 characters long'];
        if (!permissions || typeof permissions !== 'object') return ['Invalid permissions format'];

        return [
            undefined,
            new CreateRoleDto(
                name,
                permissions,
                description
            )
        ]
    }
}