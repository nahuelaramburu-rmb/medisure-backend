import { envs } from './config/envs';
import { AppRoutes } from './presentation/routes';
import { Server } from "./presentation/server";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';
import { prisma } from './data/postgres';
import { WssService } from './presentation/services/wss.service';
import { createServer } from 'http';



(async () => {
    main();
})()

function main() {
    try {
        prisma.$connect();
        console.log('Connected to Postgres database');
    } catch (error) {
        console.error('Error connecting to Postgres database:', error);
        process.exit(1); 
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
    });

    const httpServer = createServer(server.app);
    WssService.initWss({ server: httpServer})

    server.setRoutes( AppRoutes.routes );
    
    httpServer.listen(envs.PORT, () => {
        console.log(`HTTP & WebSocket server running on port ${envs.PORT}`);
        console.log(`Swagger UI is available at http://localhost:${envs.PORT}/api-docs`);
    });

    
}  