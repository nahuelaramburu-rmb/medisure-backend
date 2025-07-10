import { CreateRoomDto } from "../../domain";
import { ChatRepository } from "../../domain/repositories/chat.repository";
import { Request, Response } from "express";
import { CreateRoom } from "../../domain/use-cases/chat/create-room";
import { handleError } from "../helpers/errors";

export class ChatController{
    constructor(
        private readonly repository: ChatRepository
    ){}

    createRoom = async (req: Request, res: Response)=>{
        const [error, createRoomDto] = CreateRoomDto.create(req.body);
        if ( error ) return res.status(400).json({ error });
        const { id_user } = req.user; 

        new CreateRoom(this.repository)
            .execute(createRoomDto!, id_user)
            .then( data => {
                res.json({
                    msg: "ok",
                    data: data 
                });
            })
            .catch( error => handleError(error, res) );
    }
    getMentionsByUser(arg0: string, getMentionsByUser: any) {
        throw new Error("Method not implemented.");
    }
    getMessageById(arg0: string, getMessageById: any) {
        throw new Error("Method not implemented.");
    }
    getMessagesByRoom(arg0: string, getMessagesByRoom: any) {
        throw new Error("Method not implemented.");
    }
    sendMessage(arg0: string, sendMessage: any) {
        throw new Error("Method not implemented.");
    }
    getMembersByRoom(arg0: string, getMembersByRoom: any) {
        throw new Error("Method not implemented.");
    }
    addMemberToRoom(arg0: string, addMemberToRoom: any) {
        throw new Error("Method not implemented.");
    }
    getRoomById(arg0: string, getRoomById: any) {
        throw new Error("Method not implemented.");
    }
    getAllRooms(arg0: string, getAllRooms: any) {
        throw new Error("Method not implemented.");
    }
}