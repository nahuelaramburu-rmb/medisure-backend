import { CreateRoomDto, GetAllRooms, UserEntity } from "../../domain";
import { ChatRepository } from "../../domain/repositories/chat.repository";
import { Request, Response } from "express";
import { CreateRoom } from "../../domain/use-cases/chat/create-room";
import { handleError } from "../helpers/errors";

interface AuthenticatedRequest extends Request{
    user?: UserEntity;
}

export class ChatController{
    constructor(
        private readonly repository: ChatRepository
    ){}

    createRoom = async (req: AuthenticatedRequest, res: Response)=>{
        const [error, createRoomDto] = CreateRoomDto.create(req.body);
        if ( error ) return res.status(400).json({ error });
        if (!req.user) return res.status(401).json({ error: "Unauthorized: user not found in request" });
        
        const { id } = req.user;
        console.log(id);

        new CreateRoom(this.repository)
            .execute(createRoomDto!, id)
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
    getAllRooms = async (req: Request, res: Response) => {
        new GetAllRooms(this.repository)
            .execute()
            .then( data => {
                res.json({
                    msg: "ok",
                    data: data
                });
            })
            .catch( error => handleError(error, res) ); 
    }
}