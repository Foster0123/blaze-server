import { IsEmail, IsNotEmpty } from 'class-validator'
export class AuthDto {
    
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