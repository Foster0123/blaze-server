import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PrismaService } from "src/prisma/prisma.service";

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt'){
    constructor(private readonly prisma: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        })
    }
    
    async validate(payload: {id: number, name: string, username : string, email: string}) {
        
        return payload;
    }
}