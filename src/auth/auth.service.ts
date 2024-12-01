import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
    constructor (private prisma : PrismaService) {}
    async signup(dto: AuthDto) {
        const hash = await argon.hash(dto.password)
        const user = await this.prisma.user.create({
            data: {
                name: dto.name,
                username: dto.username,
                email: dto.email,
                password : hash
            },
            select: {
                name: true,
                username: true,
                email : true,
                password : true
            }
        })
        return `You are signed up`
    }

    async signin (dto: AuthDto) {
        // Get User Inputs & Search Email
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        })
        if(!user) {
            throw new ForbiddenException ('Email Doesnt Exist')
        }

        // Match Password If Email Exists
        const passwordMatch = await argon.verify(user.password, dto.password)
        if (!passwordMatch) {
            throw new ForbiddenException('Password Does not Match')
        }
        // Get The User Logged In
        
    }
}
