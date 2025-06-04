import { Router } from "express";
import { AuthRoutes } from "./auth/routes";

export class AppRoutes{
    static get routes(): Router{
        const router = Router();

        router.use('/v1/api/auth', AuthRoutes.routes);
        return router;
    }
}