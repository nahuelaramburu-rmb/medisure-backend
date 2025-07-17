import { Router } from "express";
import { Request, Response } from "express";
import { ChatDataSourceImpl } from "../../infraestructure/datasources/chat.datasource.impl";
import { ChatRepositoryImpl } from "../../infraestructure/repositories/chat.repository.impl";
import { ChatController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";



export class ChatRoutes {
    static get routes(): Router {
        const router = Router();
        const datasource = new ChatDataSourceImpl();
        const chatRepository = new ChatRepositoryImpl(datasource);
        const chatController = new ChatController(chatRepository);

        router.use(AuthMiddleware.validateJWT);
        router.post('/create', (req: Request, res:Response) => {
            chatController.createRoom(req, res);
        })
        router.get('/rooms', chatController.getAllRooms);
        
        return router;
    }
}