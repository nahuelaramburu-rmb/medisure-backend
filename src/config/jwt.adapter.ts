import jwt from 'jsonwebtoken';
import { envs } from './envs';

const JWT_SEED = envs.JWT_SEED;

export class JwtAdapter{


    static generateToken( 
        payload: Object, 
        duration: jwt.SignOptions["expiresIn"] = '0.5h'): Promise<string|null>{
            
        return new Promise((resolve)=>{
            //TODO: seed generation
            jwt.sign(payload, JWT_SEED, { expiresIn: duration }, (err, token) => {
                if( err ) return resolve(null);
                resolve(token!);
            });
        })      
    }

    // { id: 132321 }
    static validateToken<T>(token: string):Promise<T|null>{
        return new Promise( (resolve, reject)=>{
            jwt.verify( token, JWT_SEED, (err, decoded)=>{
                if( err) return resolve( null );
                resolve( decoded as T );
            });
        });
    }
}