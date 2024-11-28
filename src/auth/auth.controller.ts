import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
@Controller('auth')
export class AuthController {
    constructor (private readonly authService: AuthService) {}
    @Post('signup')
    signup(@Body() Dto : AuthDto ) {
        console.log(Dto)
        return this.authService.signup();
    }
}