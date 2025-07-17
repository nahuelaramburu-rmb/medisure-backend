import { Router } from "express";
import { CohortController } from "./controller";
import { CohortDatasourceImpl, CohortRepositoryImpl } from "../../infraestructure";
import { AuthMiddleware } from "../middlewares/auth.middleware";


export class CohortRouter{
    static get routes():Router{
        const router = Router();
        const datasource = new CohortDatasourceImpl();
        const repository = new CohortRepositoryImpl(datasource);
        const cohortController = new CohortController(repository);

        router.use(AuthMiddleware.validateJWT);
        router.get('/', cohortController.getCohorts);
        router.get('/:id', cohortController.getCohortById);
        router.post('/create', (req, res) => {
            cohortController.createCohort(req, res);
        });
        router.put('/:id', (req, res) => {
            cohortController.updateCohort(req, res);
        });
        router.delete('/:id', cohortController.deleteCohort);

        return router;
    }

}