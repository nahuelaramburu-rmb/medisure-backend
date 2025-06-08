import { Request, Response } from 'express';
import { AuthRepository, CustomError, RegisterUser, RegisterUserDto, LoginUserDto, ChangePasswordDto } from '../../domain';
import { UserModel } from '../../data/mongodb';
import { LoginUser } from '../../domain/use-cases/auth/login-user.use-case';
import { ChangePassword } from '../../domain/use-cases/auth/change-password-use.case';


/**
 * @swagger
 * /v1/api/auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario registrado
 *       400:
 *         description: Error de validación
 */

/**
 * @swagger
 * /v1/api/auth/change-password:
 *   post:
 *     summary: Cambiar la contraseña del usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contraseña cambiada exitosamente
 *       400:
 *         description: Error de validación
 */

/**
 * @swagger
 * /v1/api/auth/:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *       500:
 *         description: Error interno del servidor
 */

export class AuthController {
    // DI 
    constructor(
        private readonly authRepository: AuthRepository,
    ) {}


    private handleError = (error: unknown, res: Response ) =>{
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

    loginUser = async( req: Request, res:Response)=>{
        const [error, loginUserDto] = LoginUserDto.create(req.body);
        if(error) return res.status(400).json({error});

        new LoginUser(this.authRepository)
            .execute( loginUserDto! )
            .then( (data) => res.json(data) )
            .catch( error => this.handleError(error, res) );

    }
    registerUser = async (req: Request, res: Response)=>{
        const [error, registerUserDto] = RegisterUserDto.create(req.body);
        if(error) return res.status(400).json({error});
        
        new RegisterUser(this.authRepository)
            .execute( registerUserDto!)
            .then( (data) => res.json(data) )
            .catch( error => this.handleError(error, res) );            
    }

    changePassword = async (req: Request, res: Response)=>{
        const [error, changePasswordDto] = ChangePasswordDto.create(req.body); 
        if (error) return res.status(400).json({error});

        new ChangePassword(this.authRepository)
            .execute( changePasswordDto!)
            .then( (data) => res.json({
                message: 'Password changed successfully',
                data
            }))
            .catch( error => this.handleError(error, res) );
    }

    getUsers = (req: Request, res: Response) => {
        UserModel.find()
            .then(users =>
                    res.json({
                        users, 
                        user: req.user  // Changed from req.body.user to req.user
                    }))
            .catch(error => this.handleError(error, res));
    }
}