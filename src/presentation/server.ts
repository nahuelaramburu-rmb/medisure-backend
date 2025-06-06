import express, { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '../swagger';
import cors from 'cors';

interface Options{
    port?: number;
    routes: Router;
    middlewares?: any []
}


export class Server{
    public readonly app = express();
    private readonly port:number ;
    private readonly routes :Router;

    constructor(option: Options){
        const {port = 3100, routes } = option;
        this.port = port;
        this.routes = routes;
    }

    async start(){
        //middlewares
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true})); //x-www-form-urlencoded

        //Middleware for Swagger UI

        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

        //defined routes
        this.app.use(this.routes);

        this.app.listen(this.port, ()=>{
            console.log(`Server is running on port ${this.port}`);
            console.log(`Swagger UI is available at http://localhost:${this.port}/api-docs`);
        })
    }
    }