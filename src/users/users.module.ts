import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { FetcherModule } from '../fetcher/fetcher.module';

@Module({
  imports: [FetcherModule],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
