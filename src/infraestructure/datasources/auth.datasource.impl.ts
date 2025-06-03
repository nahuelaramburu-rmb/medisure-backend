import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { AuthDatasource, CustomError, RegisterUserDto, UserEntity } from "../../domain";
import { UserMapper } from "../mappers/user.mappers";

type HashFunction =(password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;

export class AuthDatasourceImpl implements AuthDatasource{
    constructor(
        private readonly hashPassword: HashFunction = BcryptAdapter.hash,
        private readonly comparePassword: CompareFunction = BcryptAdapter.compare
    ) {
        // Initialize any dependencies if needed
    }


    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        const { name, email, password} = registerUserDto;

        // Simulate a database operation
        try{
            //1. Verify if the user already exists
            const exist = await UserModel.findOne({email});
            if ( exist) throw CustomError.badRequest('Credentials error');
            //2. Hash the password
            const user = await UserModel.create({
                name,
                email,
                password: this.hashPassword(password),
            })
            await user.save();
            //3 Map the DTO to an entity
            //TODO: map the DTO to an entity


            //4. Save the user in the database
            return UserMapper.UserEntityFromObject(user);

        }catch(error){
            console.error(error); 
            if( error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServerError();
        }
    }
}