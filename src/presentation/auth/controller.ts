import { Request, Response } from 'express';
import { AuthRepository, CustomError, RegisterUser, RegisterUserDto, LoginUserDto, ChangePasswordDto } from '../../domain';
import { LoginUser } from '../../domain/use-cases/auth/login-user.use-case';
import { ChangePassword } from '../../domain/use-cases/auth/change-password-use.case';
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
        console.log("IP Address:", ip);
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
        const {id, token } = req.body;
        prisma.users.findUnique({ where: { id } })
            .then(user => {
                logger.info(`User logged out: ${id} with token: ${token}`);
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

    getUsers = (req: Request, res: Response) => {
        prisma.users.findMany()
            .then(users =>
                    res.json({
                        users,
                        //user: req.body.user 
                    }))
            .catch(error => handleError(error, res));
    }
}