import 'dotenv/config';
import { get } from 'env-var';


//adaptador patreon 
export const envs = {
    PORT: get('PORT').required().asPortNumber(),
}