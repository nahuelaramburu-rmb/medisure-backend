import { envs } from './config/envs';
import { MongoDatabase } from './data/mongodb';
import { AppRoutes } from './presentation/routes';
import { Server } from "./presentation/server";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';



(()=>{
    main();
})()

async function main(){
    //todo: await db
    await MongoDatabase.connect({
        dbName: envs.MONGO_DB_NAME,
        mongoUrl: envs.MONGO_URL,
    })

    // Swagger middleware
    const swaggerMiddleware = {
        path: '/api-docs',
        handler: swaggerUi.serve,
    };
    const swaggerSetupMiddleware = {
        path: '/api-docs',
        handler: swaggerUi.setup(swaggerSpec),
    };
    
    new Server({
        port: envs.PORT,
        routes: AppRoutes.routes, 
    })
        .start()
}  