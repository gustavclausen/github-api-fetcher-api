import { Module } from '@nestjs/common';
import { FetcherService } from './fetcher.service';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [ConfigModule],
  providers: [FetcherService],
  exports: [FetcherService]
})
export class FetcherModule {}
