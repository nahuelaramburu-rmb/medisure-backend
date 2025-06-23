import { Router } from "express";
import { CohortRepositoryImpl } from "../../infraestructure/repositories/cohort.repository.impl";
import { CohortDatasourceImpl } from "../../infraestructure/datasources/cohort.datasource.impl";
import { CohortController } from "./controller";


export class CohortRouter{
    static get routes():Router{
        const router = Router();
        const datasource = new CohortDatasourceImpl();
        const repository = new CohortRepositoryImpl(datasource);
        const cohortController = new CohortController(repository);

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