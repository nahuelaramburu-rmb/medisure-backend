import request from 'supertest'
import { testServer } from '../../test-server'
describe('testing route role',()=>{
    test('should return Roles api/roles',()=>{
        request( testServer.app )
            .get('/api/roles')
            .expect(200)
    })
})