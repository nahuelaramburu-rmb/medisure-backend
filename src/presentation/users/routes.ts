import { Router } from "express";
import { UserDatasourceImpl, UserRepositoryImpl } from "../../infraestructure";
import { UserController } from "./controller";




export class UserRoutes{
    static get routes(): Router{
        const router = Router();

        const datasource = new UserDatasourceImpl();
        const userRepository = new UserRepositoryImpl(datasource);
        const userController = new UserController(userRepository);

        router.get('/', userController.getUsers);
        router.get('/users/:user_name', userController.getUserByUserName);

        return router;
    }
}