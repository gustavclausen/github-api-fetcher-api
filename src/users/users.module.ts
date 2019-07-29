import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ConfigService } from '../config/config.service';
import { FetcherService } from '../fetcher/fetcher.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, FetcherService, ConfigService]
})
export class UsersModule {}
