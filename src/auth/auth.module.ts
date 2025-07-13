import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register(
      {
        signOptions: {
          expiresIn: process.env.JWT_VALIDITY
        },
        secret: process.env.JWT_SECRET
      })],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule { }
