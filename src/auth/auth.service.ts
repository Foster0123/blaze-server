import { Injectable } from '@nestjs/common';
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
}
