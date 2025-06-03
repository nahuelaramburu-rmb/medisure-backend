import { Router, Request, Response } from "express";
import { AuthController } from "./controller";
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { AuthDatasourceImpl, AuthRepositoryImpl } from "../../infraestructure";

export class AuthRoutes{

    static get routes(): Router{
        const router = Router();

        const datasource = new AuthDatasourceImpl();
        // Dependency Injection
        const AuthRepository = new AuthRepositoryImpl(datasource);
        const controller = new AuthController(AuthRepository);


        router.post('/login', (req:Request, res:Response) => controller.loginUser(req, res));
        router.post('/register', (req:Request, res:Response) => {
            controller.registerUser(req, res);
        });

        return router;
    }
}