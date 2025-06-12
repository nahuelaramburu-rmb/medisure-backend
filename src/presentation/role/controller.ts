import { Request, Response } from "express";
import {  CreateRole, CreateRoleDto, CustomError, DeleteRole, GetRoleById, GetRoles, RoleRepository, UpdateRole } from "../../domain";
import { UpdateRoleDto } from '../../domain/dtos/roles/update-role.dto';


export class RoleController{
    constructor(
        private readonly roleRepository: RoleRepository
    ){}

    updateRole = async (req: Request, res: Response)=>{
        const id = +req.params.id;
        const [error, updateRoleDto] = UpdateRoleDto.create({...req.body, id});
        if (error) return res.status(400).json({ error });
        
        new UpdateRole(this.roleRepository)
            .execute(updateRoleDto!)
            .then((data) => {
                res.json({
                    msg: 'ok',  
                    data
                });
            })
            .catch((error) => {
                if (error instanceof CustomError) {
                    return res.status(error.statusCode).json({ error: error.message });
                }
                console.error(error);
                return res.status(500).json({ error: 'Internal Server Error' });
            })
    }

    createRole = async (req: Request , res: Response)=>{
        const [error, createRoleDto] = CreateRoleDto.create(req.body);
        if (error) return res.status(400).json({ error });
        
        new CreateRole(this.roleRepository)
            .execute( createRoleDto! )
            .then((data) => {
                res.json({
                    mgs: 'ok',
                    data
                });
            })
            .catch((error) => {
                if (error instanceof CustomError) {
                    return res.status(error.statusCode).json({ error: error.message });
                }
                console.error(error);
                return res.status(500).json({ error: 'Internal Server Error' });
            })
    }

    getRoles = async(req: Request, res: Response) => {
        
        new GetRoles(this.roleRepository)
            .execute()
            .then((data) => {
                res.json({
                    msg: 'ok',
                    data
                });
            })
            .catch((error) => {
                if (error instanceof CustomError) {
                    return res.status(error.statusCode).json({ error: error.message });
                }
                console.error(error);
                return res.status(500).json({ error: 'Internal Server Error' });
            })
    }

    getRoleById = (req: Request, res: Response) => {
        const id = +req.params.id;
        new GetRoleById(this.roleRepository)
            .execute(id)
            .then((data) => {
                res.json({
                    msg: 'ok',
                    data
                });
            })
            .catch((error) => {
                if (error instanceof CustomError) {
                    return res.status(error.statusCode).json({ error: error.message });
                }
                console.error(error);
                return res.status(500).json({ error: 'Internal Server Error' });
            })
        }

    deleteRole = async (req:Request, res: Response)=>{
        const id = +req.params.id;
        
        new DeleteRole(this.roleRepository)
            .execute(id)
            .then((data) => {
                res.json({
                    msg: 'ok',
                    data
                });
            })
            .catch((error) => {
                if (error instanceof CustomError) {
                    return res.status(error.statusCode).json({ error: error.message });
                }
                console.error(error);
                return res.status(500).json({ error: 'Internal Server Error' });
            })
    }
}