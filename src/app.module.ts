import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from './config/config.module';
import { FetcherModule } from './fetcher/fetcher.module';

@Module({
  imports: [ConfigModule, FetcherModule, UsersModule]
})
export class AppModule {}
