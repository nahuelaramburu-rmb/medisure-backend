import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";


export class AuthMiddleware {


    static async validateJWT ( req: Request, res: Response, next: NextFunction): Promise<void>{

        const authorization = req.header('Authorization');
        if( !authorization) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
        if( !authorization.startsWith('Bearer ')) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
        
        const token = req.headers.authorization?.split(' ').at(1); // Assuming Bearer token format

        try{
            const payload = await JwtAdapter.validateToken<{ id: string}>(token!);
            if( !payload ) {
                res.status(401).json({ error: 'Invalid Token' });
                return;
            }
            const user = await UserModel.findById(payload.id);
            if( !user ) {
                res.status(401).json({ error: 'User not found' });
                return;
            }
            // validate user's token
            console.log(req.body);
            req.body.payload = user; 


            next();

        }catch (error) {
            console.error('JWT validation error:', error);
            res.status(500).json({ error: 'Invalid token' });
        }   
    }
}