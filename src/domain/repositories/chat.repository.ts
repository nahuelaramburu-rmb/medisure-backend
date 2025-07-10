import { CreateChatMessageDto, CreateRoomDto } from "../dtos";
import { ChatMessageEntity } from "../entities/chat/chat-mensaje.entity";
import { ChatRoomEntity } from "../entities/chat/chat-room.entity";


export interface ChatRepository{
    saveMessage(message: CreateChatMessageDto): Promise<void>;
    getMessagesByRoom(roomId: string, limit?: number, before?: Date): Promise<ChatMessageEntity[]>;
    getMessageById(messageId: string): Promise<ChatMessageEntity | null>;
    
    createRoom(createRoomDto: CreateRoomDto, id_user:string): Promise<ChatRoomEntity>;
    getRooms(): Promise<ChatRoomEntity[]>;  
}