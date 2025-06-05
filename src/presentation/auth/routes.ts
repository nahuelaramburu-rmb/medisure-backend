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

        /**
         * @swagger
         * /auth/login:
         *   post:
         *     summary: Iniciar sesión de usuario
         *     tags: [Auth]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               email:
         *                 type: string
         *               password:
         *                 type: string
         *     responses:
         *       200:
         *         description: Usuario autenticado
         *       401:
         *         description: Credenciales inválidas
         */
        router.post('/login', (req:Request, res:Response) => {
            controller.loginUser(req, res)
        });
        router.post('/register', (req:Request, res:Response) => {
            controller.registerUser(req, res);
        });
        router.get('/', AuthMiddleware.validateJWT , (req: Request, res: Response) => {
            controller.getUsers(req, res)
        });
        
        return router;
    }
}