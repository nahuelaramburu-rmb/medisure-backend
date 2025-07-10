

export class ChatRoomEntity {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly members: string[],
        public readonly created_at: Date
    ) {}

    static fromObject(object: { [key: string]: any }): ChatRoomEntity {
        const { id, name, members, created_at } = object;

        return new ChatRoomEntity(
            id,
            name,
            members || [],
            new Date(created_at)
        );
    }
}