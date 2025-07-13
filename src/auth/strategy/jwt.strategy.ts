import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PostgresService } from "src/database/postgres.service";

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt'){
    constructor(private readonly prisma: PostgresService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        })
    }
    
    async validate(payload: {id: number, name: string, username : string, email: string}) {
        
        return payload;
    }
}