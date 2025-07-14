import { prisma } from "../../data/postgres";
import { CreateChatMessageDto, ChatMessageEntity, CustomError, ChatRoomEntity, CreateRoomDto } from "../../domain";
import { ChatDataSource } from "../../domain/datasources/chat.datasource";
import { WssService } from "../../presentation/services/wss.service";


export class ChatDataSourceImpl implements ChatDataSource {
    
    constructor(
        private readonly wwService = WssService.instance
    ){

    }
    async getRooms(): Promise<ChatRoomEntity[]> {
        const rooms = await prisma.chat_rooms.findMany();
        return rooms.map(room => ChatRoomEntity.fromObject(room));
    }
    
    async createRoom(createRoomDto: CreateRoomDto, id_user: string): Promise<ChatRoomEntity> {
        try {
            
            const room = await prisma.chat_rooms.create({
                data: {
                    ...createRoomDto,
                    created_by: id_user
                }
            });

            
            await prisma.chat_members.create({
                data: {
                    chat_room_id: room.id,
                    user_id: id_user
                }
            });

            
            const roomWithMembers = await prisma.chat_rooms.findUnique({
                where: { id: room.id },
                include: { members: true }
            });
            this.onUserMemberJoined(room.id, id_user);
            
            return ChatRoomEntity.fromObject(roomWithMembers!);
        } catch (error) {
            console.log(error);
            throw CustomError.internalServerError();
        }
    }
    async saveMessage(message: CreateChatMessageDto): Promise<void> {
        const { chat_room_id, sender_id, content, mentions } = message;
        await this.findChatRoomById(chat_room_id);
        try {
            await prisma.chat_messages.create({
                data: {
                    chat_room_id,
                    sender_id,
                    content,
                    mentions: mentions || [],
                    sent_at: message.sent_at || new Date()
                }
            })
        } catch (error) {
            throw CustomError.internalServerError();
        }
    }
    async getMessagesByRoom(roomId: string, limit?: number, before?: Date): Promise<ChatMessageEntity[]> {
        const messages = await prisma.chat_messages.findMany({
            where: {
                chat_room_id: roomId,
                ...(before && { sent_at: { lt: before } })
            },
            orderBy: { sent_at: 'desc' },
            take: limit || 50,
            include: {
                sender: true,
            }
        });
        return messages.map(message => ChatMessageEntity.fromObject(message));
    }
    async getMessageById(messageId: string): Promise<ChatMessageEntity | null> {
        const message = await prisma.chat_messages.findUnique({
            where: { id: messageId },
            include: { sender: true }
        });
        return message ? ChatMessageEntity.fromObject(message) : null;
    }
    async findChatRoomById(roomId: string): Promise<ChatRoomEntity> {
        try {
            const room = await prisma.chat_rooms.findUnique({
                where: { id: roomId },
                include: { members: true }
            });
            if (!room) throw new CustomError(404, `Chat room with ID ${roomId} not found`);
            return ChatRoomEntity.fromObject(room);
        } catch (error) {
            throw new Error(`Error finding chat room with ID ${roomId}`);
        }

    }
    private onUserMemberJoined(roomId: string, userId: string) {
        this.wwService.sendMessage('user_joined', {
            roomId,
            userId
        });
    }
}