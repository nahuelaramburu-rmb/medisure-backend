import express, { Router } from 'express';
import cors from 'cors'; // Add this import
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '../swagger';

interface Options{
    port?: number;
    routes: Router;
    middlewares?: any []
}

export class Server{
    public readonly app = express();
    private readonly port: number;
    private readonly routes: Router;
    
    constructor(option: Options){
        const {port = 3100, routes } = option;
        this.port = port;
        this.routes = routes;
    }
    
    async start(){
        // CORS configuration - MUST be first!
        this.app.use(cors({
            origin: 'http://localhost:8082', // Your Next.js frontend URL
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization']
        }));
        
        // Other middlewares
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true})); // x-www-form-urlencoded
        
        // Middleware for Swagger UI
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
        
        // Defined routes
        this.app.use(this.routes);
        
        this.app.listen(this.port, ()=>{
            console.log(`Server is running on port ${this.port}`);
            console.log(`Swagger UI is available at http://localhost:${this.port}/api-docs`);
        })
    }
}