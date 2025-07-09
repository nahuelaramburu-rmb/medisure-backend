

export class ChatRoomEntity {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly members: string[],
        public readonly createdAt: Date
    ) {}

    static fromObject(object: { [key: string]: any }): ChatRoomEntity {
        const { id, name, members, createdAt } = object;

        return new ChatRoomEntity(
            id,
            name,
            members || [],
            new Date(createdAt)
        );
    }
}