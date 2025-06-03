import jwt from 'jsonwebtoken';

export class JwtAdapter{
    static generateToken( 
        payload: Object, 
        duration: jwt.SignOptions["expiresIn"] = '2h'): Promise<string|null>{
        return new Promise((resolve)=>{
            //TODO: seed generation
            jwt.sign(payload, 'SEED', { expiresIn: duration }, (err, token) => {
                if( err ) return resolve(null);
                resolve(token!);
            });
        })      
    }
}