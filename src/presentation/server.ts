import express, { Router } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '../swagger';
import { CronJob } from 'cron';
import { CronService } from './services/cron.service';
import { CheckMedicalRecordAlert, MedicalRecordRepository } from '../domain';

import { LogRepositoryImpl } from '../infraestructure/repositories/log.repository.impl';
import { FileSystemDataSourceImpl } from '../infraestructure/datasources/file-system.datasource.impl';
import { MedicalRecordRepositoryImpl } from '../infraestructure/repositories/medical-record.repository.impl';
import { MedicalRecordDataSourceImpl } from '../infraestructure/datasources/medical-record.datasource.impl';

interface Options {
    port?: number;
    //routes: Router;
    middlewares?: any[]
}

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDataSourceImpl()
);

const medicalRecordRepository = new MedicalRecordRepositoryImpl(
    new MedicalRecordDataSourceImpl()
)

export class Server {
    public readonly app = express();
    private serverListener?: any;
    private readonly port: number;
    //private readonly routes: Router;

    constructor(option: Options) {
        const { port = 3100 } = option;
        this.port = port;
        this.configure();
    }
    private configure() {
        this.app.use(cors({
            origin: '*',
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization']
        }));

        // Other middlewares
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded

        // Middleware for Swagger UI
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

        // Defined routes
        //this.app.use(this.routes);



        CronService.createJob(
            '*/5 * * * * *',
            async () => {
                const date = new Date();
                await new CheckMedicalRecordAlert(
                    fileSystemLogRepository,
                    medicalRecordRepository
                )//.execute();
            }
        );
    }

    public setRoutes( router: Router ){
        this.app.use(router);
    }

    async start() {
        console.log("Express server starting...");
    }
    public close(){
        this.serverListener?.close();
    }
}