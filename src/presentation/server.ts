import express, { Router } from 'express';
import cors from 'cors'; 
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '../swagger';
import { CronJob } from 'cron';
import { CronService } from './services/cron.service';
import { CheckMedicalRecordAlert, MedicalRecordRepository } from '../domain';
import { LogRepository } from '../domain/repositories/log.repository';
import { LogRepositoryImpl } from '../infraestructure/repositories/log.repository.impl';
import { FileSystemDataSourceImpl } from '../infraestructure/datasources/file-system.datasource.impl';
import { MedicalRecordRepositoryImpl } from '../infraestructure/repositories/medical-record.repository.impl';
import { MedicalRecordDataSourceImpl } from '../infraestructure/datasources/medical-record.datasource.impl';

interface Options {
    port?: number;
    routes: Router;
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
    private readonly port: number;
    private readonly routes: Router;

    constructor(option: Options) {
        const { port = 3100, routes } = option;
        this.port = port;
        this.routes = routes;
    }

    async start() {
        // CORS configuration - MUST be first!
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
        this.app.use(this.routes);

        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
            console.log(`Swagger UI is available at http://localhost:${this.port}/api-docs`);
        })

        CronService.createJob(
            '*/5 * * * * *',
            async() => {
                const date = new Date();
                await new CheckMedicalRecordAlert(
                    fileSystemLogRepository,
                    medicalRecordRepository
                )//.execute();
            }
        );
    }
}