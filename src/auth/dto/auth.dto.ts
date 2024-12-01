import { IsEmail, IsNotEmpty } from 'class-validator'
export class SignupDto {
    
    @IsNotEmpty()
    readonly name : string

    @IsNotEmpty()
    readonly username : string

    @IsEmail()
    @IsNotEmpty()
    readonly email : string
    
    @IsNotEmpty()
    readonly password : string

}
export class SigninDto {
    @IsNotEmpty()
    @IsEmail()
    readonly email : string

    @IsNotEmpty()
    readonly password : string
}