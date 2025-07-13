import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { TodoModule } from './todo/todo.module';


@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UserModule, DatabaseModule, TodoModule],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
