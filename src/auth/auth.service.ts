import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { PostgresService } from 'src/database/postgres.service';
import { SigninDto, SignupDto } from './dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private prisma: PostgresService, private jwt: JwtService) { }
    async signup(dto: SignupDto) {
        const hash = await argon.hash(dto.password)
        const checkEmail = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            },
            select: {
                email: true
            }
        })
        const checkUsername = await this.prisma.user.findUnique({
            where: { 
                username: dto.username 
            },
            select: { 
                username: true 
            }
        })
        console.log(checkEmail, checkUsername)
        if (!checkEmail && !checkUsername) {
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
            return { user : user }
        }
        else {
            if (checkEmail && checkUsername) {
                return 'Email & Username Already Taken'
            }
            if (checkEmail) {
                return 'Email Is In Use'
            }
            if (checkUsername) {
                return 'Username Is In Use'
            }
        }
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

            return this.signWithJwt(user.id, user.name, user.username, user.email)
        }
        else {
            return 'Invalid Credentials'
        }
    }

    async signWithJwt(id: number , name: string, username: string, email: string): Promise<{ access_token: string }> {
        const payload = {
            id: id,
            name, 
            username, 
            email
        }
        const token = await this.jwt.signAsync(payload,  {
            secret: process.env.JWT_SECRET,
        })
        return { access_token: token }
    }
}
