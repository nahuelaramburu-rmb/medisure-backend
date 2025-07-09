

export class CreateRoomDto {
    private constructor(
        public readonly name: string | null,
        public readonly type: string,
        
    ) {}

    static create(props: { [key: string]: any }): [string?, CreateRoomDto?] {
        const { name = null, type, created_by, members} = props;

        if (!type || !name ) {
            return ['Invalid data', undefined];
        }

        return [
            undefined,
            new CreateRoomDto(
                name,
                type,
                
                
            ),
        ];
    }
}