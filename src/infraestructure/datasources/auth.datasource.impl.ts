import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { AuthDatasource, ChangePasswordDto, CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";
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
          
            return UserMapper.UserEntityFromObject(user);

        }catch(error){
            console.error(error); 
            if( error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServerError();
        }
    }

    async login(loginUserDto: LoginUserDto): Promise<UserEntity>{
        const { email, password } = loginUserDto;
        try{
            //1. Verify if the user exists
            const user = await UserModel.findOne({ email });
            if (!user) throw CustomError.badRequest('Credentials error');   
            //2. Compare the password
            const isValid = this.comparePassword(password, user.password);
            if (!isValid) throw CustomError.badRequest('Credentials error');
            //3. Map the DTO to an entity
            const userEntity = UserMapper.UserEntityFromObject(user);

            return userEntity;
        }catch(error){
            console.error(error);
            if( error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServerError();
        }
    }

    async changePassword( changePasswordDto: ChangePasswordDto): Promise<UserEntity>{
        const { email, oldPassword, newPassword } = changePasswordDto;
        try{
            const user = await UserModel.findOne({ email});
            if (!user) throw CustomError.badRequest('Credentials error');
            //1. Compare the old password
            const isValid = this.comparePassword(oldPassword, user.password);
            if (!isValid) throw CustomError.badRequest('Credentials error');
            //2. Hash the new password
            user.password = this.hashPassword(newPassword);
            //3. Save the user
            user.passwordChangedAt = new Date();
            await user.save();

            return UserMapper.UserEntityFromObject(user);
        }catch(error){
            if(error instanceof CustomError) throw error;
            throw CustomError.internalServerError();
        }
    }
}