import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto, SignupDto } from './dto';
@Controller('auth')
export class AuthController {
    constructor (private readonly authService: AuthService) {}
    @Post('signin')
    signin(@Body() Dto : SigninDto ) {
        return this.authService.signin(Dto);
    }
    @HttpCode(HttpStatus.OK)
    @Post('signup')
    signup(@Body() Dto : SignupDto ) {
        return this.authService.signup(Dto);
    }
}