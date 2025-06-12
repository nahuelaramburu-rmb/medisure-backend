

export class RoleEntity {
    constructor(
        public id: number,
        public name: string,
        public permissions: any, // Puedes usar 'any' para JSONB, o un tipo más específico como 'object'
        public description?: string,
        public created_at?: Date,
    ) { }
    public static fromObject(object: { [key: string]: any }): RoleEntity {
        const { id, name, permissions, description, created_at } = object;
        if (!id) throw 'Missing Id';
        if (!name) throw 'Missing Name';
        if (!permissions) throw 'Missing Permissions';
        let perms = permissions;
        if (typeof perms === 'string') {
            try {
                perms = JSON.parse(perms);
            } catch {
                throw 'Permissions must be a valid JSON object';
            }
        }
        return new RoleEntity(
            id,
            name,
            perms,
            description,
        )
    }
}