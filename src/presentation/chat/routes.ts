import { Router } from "express";
import { Request, Response } from "express";
import { ChatDataSourceImpl } from "../../infraestructure/datasources/chat.datasource";
import { ChatRepositoryImpl } from "../../infraestructure/repositories/chat.repository.impl";
import { ChatController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";



export class ChatRoutes {
    static get routes(): Router {
        const router = Router();
        const datasource = new ChatDataSourceImpl();
        const chatRepository = new ChatRepositoryImpl(datasource);
        const chatController = new ChatController(chatRepository);

        router.post('/create',[AuthMiddleware.validateJWT], (req: Request, res:Response) => {
            chatController.createRoom(req, res);
        })
        router.get('/rooms', chatController.getAllRooms);
        router.get('/rooms/:id', chatController.getRoomById);
        router.post('/rooms/:roomId/members', chatController.addMemberToRoom);
        router.get('/rooms/:roomId/members', chatController.getMembersByRoom);
        router.post('/rooms/:roomId/messages', chatController.sendMessage);
        router.get('/rooms/:roomId/messages', chatController.getMessagesByRoom);

        router.get('/messages/:messageId', chatController.getMessageById);
        router.get('/mentions/:userId', chatController.getMentionsByUser);

        return router;
    }
}