import { envs } from './config/envs';
import { MongoDatabase } from './data/mongodb';
import { AppRoutes } from './presentation/routes';
import { Server } from "./presentation/server";


(()=>{
    main();
})()

async function main(){
    //todo: await db
    await MongoDatabase.connect({
        dbName: envs.MONGO_DB_NAME,
        mongoUrl: envs.MONGO_URL,
    })

    //todo: inicio server
    new Server({
        port: envs.PORT,
        routes: AppRoutes.routes, 
    })
        .start()
}  