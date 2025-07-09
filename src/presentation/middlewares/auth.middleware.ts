import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config";
import { prisma } from "../../data/postgres";

declare global {
    namespace Express {
        interface Request {
            user?: any; 
        }
    }
}

export class AuthMiddleware {
    static async validateJWT(req: Request, res: Response, next: NextFunction): Promise<void> {
        const authorization = req.header('Authorization');
        
        if (!authorization) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
        
        if (!authorization.startsWith('Bearer ')) {
            res.status(401).json({ error: 'Invalid Bearer Token' });
            return;
        }
       
        const token = authorization.split(' ')[1] || ''; 
        
        try {
            const payload = await JwtAdapter.validateToken<{ id: string }>(token);
            
            if (!payload) {
                res.status(401).json({ error: 'Invalid Token' });
                return;
            }
            
            const user = await prisma.users.findUnique({where: { id: payload.id }});
            //TODO: Check if user exists
            if (!user) {
                res.status(401).json({ error: 'User not found' });
                return;
            }
            
            // FIXED: Attach user to req.user instead of req.body.payload
            req.user = user;
            next();
            
        } catch (error) {
            console.error('JWT validation error:', error);
            res.status(500).json({ error: 'Invalid token' });
        }  
    }
}