import { Request, Response } from 'express';
import { AuthRepository, CustomError, RegisterUser, RegisterUserDto, LoginUserDto, ChangePasswordDto, ValidateEmail, GetUsers, LoginUser, ChangePassword } from '../../domain';

import { logger } from '../../config/logger';
import { prisma } from '../../data/postgres';
import { handleError } from '../helpers/errors';


export class AuthController {
    // DI 
    constructor(
        private readonly authRepository: AuthRepository,
    ) {}


    loginUser = async( req: Request, res:Response)=>{
        const [error, loginUserDto] = LoginUserDto.create(req.body);
        
        let ip = req.headers['x-forwarded-for']?.toString().split(',')[0] || req.socket.remoteAddress || "0.0.0.0";
        if(error) return res.status(400).json({error});

        new LoginUser(this.authRepository)
            .execute( loginUserDto!, ip )
            .then( (data) => {
                logger.info(`User logged in: ${loginUserDto!.email}`);
                res.json(data)
            })
            .catch( error => {
                logger.warn(`Failed to login user: ${loginUserDto!.email}`);
                handleError(error, res) 
            });

    }

    logoutUser = (req: Request, res: Response) => {
        const { id_user } = req.body.user; 
        prisma.users.findUnique({ where: { id:id_user } })
            .then(user => {
                res.json({ message: 'Logout successful' });
            })
            .catch(error => {
                logger.error(`Failed to logout user: ${error}`);
                handleError(error, res);
            });
    }

    registerUser = async (req: Request, res: Response)=>{
        const [error, registerUserDto] = RegisterUserDto.create(req.body);
        if(error) return res.status(400).json({error});
        
        new RegisterUser(this.authRepository)
            .execute( registerUserDto!)
            .then( (data) => {

                res.json(data) 
            })
            .catch( error => {
                handleError(error, res) 
            });            
    }

    changePassword = async (req: Request, res: Response)=>{
        const [error, changePasswordDto] = ChangePasswordDto.create(req.body); 
        if (error) return res.status(400).json({error});

        new ChangePassword(this.authRepository)
            .execute( changePasswordDto!)
            .then( (data) => res.json({
                msg: 'ok',
                data
            }))
            .catch( error => handleError(error, res) );
    }

    validateEmail = (req: Request, res: Response)=>{
        const { token } = req.params;
        new ValidateEmail(this.authRepository)
            .execute( token )
            .then( result => res.json({
                msg: "ok",
                result: "email validated successfully"
            }) )
            .catch( error => handleError(error, res) );
    }

    getUsers = (req: Request, res: Response) => {
        new GetUsers(this.authRepository)
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
}