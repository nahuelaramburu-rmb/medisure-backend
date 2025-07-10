import { CreateChatMessageDto, CreateRoomDto } from "../dtos";
import { ChatMessageEntity } from "../entities/chat/chat-mensaje.entity";
import { ChatRoomEntity } from "../entities/chat/chat-room.entity";


export abstract class ChatDataSource{
    abstract saveMessage(message: CreateChatMessageDto): Promise<void>;
    abstract getMessagesByRoom(roomId: string, limit?: number, before?: Date):Promise<ChatMessageEntity[]>;
    abstract getMessageById(messageId: string): Promise<ChatMessageEntity | null>;
    
    
    abstract createRoom(createRoomDto: CreateRoomDto, id_user:string): Promise<ChatRoomEntity>;
    abstract getRooms(): Promise<ChatRoomEntity[]>;
}