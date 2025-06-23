import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guard';

@Controller('user')
export class UserController {
    constructor (private userService : UserService) {}
    @UseGuards(JwtGuard)
    @Get('account')
        redirectToAccount (@Req() req : Request) {
            return req.user
        }
}
