

export class CreateChatMessageDto{
    private constructor(
        public readonly chat_room_id: string,
        public readonly sender_id: string,
        public readonly content: string,
        public readonly mentions: string[],
        public readonly sent_at: Date
    ){}

    static create( props: {[key:string]:any} ): [string?, CreateChatMessageDto?] {
        const { chat_room_id, sender_id, content, mentions, sent_at } = props;

        

        return [undefined, new CreateChatMessageDto(chat_room_id, sender_id, content, mentions || [], sent_at)];
    }
}