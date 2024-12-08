import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { SigninDto, SignupDto } from './dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService) { }
    async signup(dto: SignupDto) {
        const hash = await argon.hash(dto.password)
        const user = await this.prisma.user.create({
            data: {
                name: dto.name,
                username: dto.username,
                email: dto.email,
                password: hash
            },
            select: {
                name: true,
                username: true,
                email: true
            }
        })
        return `You are signed up`
    }

    async signin(dto: SigninDto) {
        // Get User Inputs & Search Email
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        })
        if (!user) {
            throw new ForbiddenException('Email Doesnt Exist')
        }

        // Match Password If Email Exists
        const passwordMatch = await argon.verify(user.password, dto.password)
        if (!passwordMatch) {
            throw new ForbiddenException('Password Does not Match')
        }
        // Get The User Logged In
        if (user && passwordMatch) {

            return this.signWithJwt(user.name, user.username, user.email)
        }
        else {
            return 'Invalid Credentials'
        }
    }

    async signWithJwt(name: string, username: string, email: string): Promise<{access_token: string}> {
        const payload = {
            userId: name, username, email
        }
        const token = await this.jwt.signAsync(payload, {
            secret: process.env.JWT_SECRET
        })
        return { access_token: token }
    }
}
