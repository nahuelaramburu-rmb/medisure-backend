
export class ChatMessageEntity {
    constructor(
        public readonly id: string,
        public readonly chat_room_id: string,
        public readonly sender_id: string,
        public readonly content: string,
        public readonly mentions: string[],
        public readonly sent_at: Date
    ){}

    static fromObject(object: { [key: string]: any }): ChatMessageEntity{
        const { id, chat_room_id, sender_id, content, mentions, sent_at } = object;

        return new ChatMessageEntity(
            id,
            chat_room_id,
            sender_id,
            content,
            mentions || [],
            new Date(sent_at)
        );
    }
}