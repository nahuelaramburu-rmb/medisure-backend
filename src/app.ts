import { envs } from './config/envs';
import { AppRoutes } from './presentation/routes';
import { Server } from "./presentation/server";


(()=>{
    main();
})()

async function main(){
    //todo: await db

    //todo: inicio server
    new Server({
        port: envs.PORT,
        routes: AppRoutes.routes, 
    })
        .start()
}