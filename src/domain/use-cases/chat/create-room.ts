import { CreateRoomDto } from "../../dtos";
import { ChatRoomEntity } from "../../entities/chat/chat-room.entity";
import { ChatRepository } from "../../repositories/chat.repository";



interface CreateRoomUseCase{
    execute(dto: CreateRoomDto, id_user: string): Promise<ChatRoomEntity>;
}

export class CreateRoom implements CreateRoomUseCase{
    constructor(
        private readonly repository: ChatRepository
    ){}
    execute(dto: CreateRoomDto, id_user:string): Promise<ChatRoomEntity> {
        return this.repository.createRoom(dto, id_user);
    }
}