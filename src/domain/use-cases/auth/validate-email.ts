import { JwtAdapter } from "../../../config";
import { EmailService } from "../../../presentation/services/email.service";
import { CustomError } from "../../errors/custom.error";
import { AuthRepository } from '../../repositories/auth.repository';


interface ValidateEmailUseCase {
    execute( token: string): Promise<boolean>;
}

export class ValidateEmail implements ValidateEmailUseCase{
    constructor(
        private readonly authRepository: AuthRepository,
    ){}
    execute(token: string): Promise<boolean> {

        return this.authRepository.validateEmail(token);
    }


}