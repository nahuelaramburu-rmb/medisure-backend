import { CreateChatMessageDto, ChatMessageEntity, ChatRoomEntity, CreateRoomDto } from "../../domain";
import { ChatDataSource } from "../../domain/datasources/chat.datasource";
import { ChatRepository } from "../../domain/repositories/chat.repository";


export class ChatRepositoryImpl implements ChatRepository{
    constructor(
        private readonly datasource: ChatDataSource
    ){}
    createRoom(createRoomDto: CreateRoomDto, id_user:string): Promise<ChatRoomEntity> {
        return this.datasource.createRoom(createRoomDto, id_user);
    }
    saveMessage(message: CreateChatMessageDto): Promise<void> {
        return this.datasource.saveMessage(message);
    }
    getMessagesByRoom(roomId: string, limit?: number, before?: Date): Promise<ChatMessageEntity[]> {
        return this.datasource.getMessagesByRoom(roomId, limit, before);
    }
    getMessageById(messageId: string): Promise<ChatMessageEntity | null> {
        return this.datasource.getMessageById(messageId);
    }

}