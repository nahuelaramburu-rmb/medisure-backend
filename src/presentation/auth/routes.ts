import { Router, Request, Response } from "express";
import { AuthController } from "./controller";
import { AuthDatasourceImpl, AuthRepositoryImpl } from "../../infraestructure";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class AuthRoutes{

    static get routes(): Router{
        const router = Router();

        const datasource = new AuthDatasourceImpl();
        // Dependency Injection
        const AuthRepository = new AuthRepositoryImpl(datasource);
        const controller = new AuthController(AuthRepository);

        
        router.post('/login', (req:Request, res:Response) => {
            controller.loginUser(req, res)
        });
        router.post('/logout', AuthMiddleware.validateJWT, (req: Request, res: Response)=> {
            controller.logoutUser(req, res);
        })
        router.post('/register', (req:Request, res:Response) => {
            controller.registerUser(req, res);
        });
        router.post('/change-password', AuthMiddleware.validateJWT, (req:Request, res:Response) =>{
            controller.changePassword(req, res);
        })
        router.get('/', AuthMiddleware.validateJWT , (req: Request, res: Response) => {
            controller.getUsers(req, res)
        });
        
        return router;
    }
}