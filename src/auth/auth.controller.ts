import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
@Controller('auth')
export class AuthController {
    constructor (private readonly authService: AuthService) {}
    @Post('signup')
    signup(@Body() Dto : AuthDto ) {
        return this.authService.signup(Dto);
    }
    @Post('signin')
    signin(@Body() Dto : AuthDto ) {
        return this.authService.signin(Dto);
    }
}