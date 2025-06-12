import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { RoleRoutes } from "./role/routes";

export class AppRoutes{
    static get routes(): Router{
        const router = Router();

        router.use('/v1/api/auth', AuthRoutes.routes);
        router.use('/v1/api/roles', RoleRoutes.routes);
        return router;
    }
}