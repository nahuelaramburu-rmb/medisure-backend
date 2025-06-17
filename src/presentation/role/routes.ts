import { Router } from "express";
import { RoleDataSourceImp } from "../../infraestructure/datasources/role.datasource.impl";
import { RoleRepositoryImpl } from "../../infraestructure/repositories/role.repository.impl";
import { RoleController } from "./controller";



export class RoleRoutes {
    static get routes(): Router{
        const router = Router();
        const datasource = new RoleDataSourceImp();

        const roleRepository = new RoleRepositoryImpl(datasource);
        const roleController = new RoleController(roleRepository);
        
        router.get('/:id', (req, res) => {
            roleController.getRoleById(req, res);
        });

        router.get('/', (req, res) => {
            roleController.getRoles(req, res);      
        });

        router.post('/create', (req, res) => {
            roleController.createRole(req, res);
        });

        router.put('/:id', (req, res) => {
            roleController.updateRole(req, res);
        });
        
        router.delete('/:id', (req, res) => {
            roleController.deleteRole(req, res);
        });

        return router;
    }
}