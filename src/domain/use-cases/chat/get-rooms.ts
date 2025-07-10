import { ChatRoomEntity } from "../../entities/chat/chat-room.entity";
import { ChatRepository } from "../../repositories/chat.repository";

interface GetRoomsUseCase{
    execute():Promise<ChatRoomEntity[]>;
}

export class GetAllRooms implements GetRoomsUseCase {
    constructor(
        private readonly repository: ChatRepository
    ){}

    execute(): Promise<ChatRoomEntity[]> {
        return this.repository.getRooms();
    }
}