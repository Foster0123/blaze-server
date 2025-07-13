import { Module } from '@nestjs/common';
import { PostgresService } from './postgres.service';
import { MongoService } from './mongo.service';

@Module({
  providers: [PostgresService, MongoService],
  exports:[PostgresService, MongoService]
})
export class DatabaseModule {}
