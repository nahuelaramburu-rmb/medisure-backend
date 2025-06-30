import { envs } from '../src/config';
import { Server } from '../src/presentation/server'


jest.mock('../src/presentation/server');

describe('Should call server start', ()=>{
    test('Should work', async ()=>{
        await import('../src/app');

        expect(Server).toHaveBeenCalledTimes(1);
        expect(Server).toHaveBeenCalledWith({
            port: envs.PORT,
            routes: expect.any(Function),
        });

        expect(Server.prototype.start).toHaveBeenCalledWith()
    })
})