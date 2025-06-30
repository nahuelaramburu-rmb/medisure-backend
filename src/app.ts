import { envs } from './config/envs';
import { AppRoutes } from './presentation/routes';
import { Server } from "./presentation/server";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';
import { prisma } from './data/postgres';



(async () => {
    main();
})()

function main() {
    try {
        prisma.$connect();
        console.log('Connected to Postgres database');
    } catch (error) {
        console.error('Error connecting to Postgres database:', error);
        process.exit(1); // Exit the process if connection fails
    }

    // Swagger middleware
    const swaggerMiddleware = {
        path: '/api-docs',
        handler: swaggerUi.serve,
    };
    const swaggerSetupMiddleware = {
        path: '/api-docs',
        handler: swaggerUi.setup(swaggerSpec),
    };

    const server = new Server({
        port: envs.PORT,
        routes: AppRoutes.routes,
    })
    server.start()
}  