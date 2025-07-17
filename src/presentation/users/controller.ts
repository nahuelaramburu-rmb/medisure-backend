import { GetUsers, GetUsersByUserName, UserEntity, UserRepository } from "../../domain";
import { Request, Response } from "express";
import { handleError } from "../helpers/errors";

export class UserController{
    constructor(
        private readonly userRepository: UserRepository,
    ){}
    getUsers = (req: Request, res: Response) => {
        new GetUsers(this.userRepository)
            .execute()
            .then((data) => {
                res.json({
                    msg: 'ok',
                    data    
                });
            })
            .catch( error => handleError(error, res)
        )
    }
    getUserByUserName = (req: Request, res: Response) => {
        
        const user_name  = req.query.user_name;
        
        new GetUsersByUserName(this.userRepository)
            .execute(user_name as string)
            .then((data)=>{
                res.json({
                    msg: 'ok',
                    data
                })
            })
            .catch((error) => handleError(error, res));
    }


}

