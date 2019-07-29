import { Module, Global } from '@nestjs/common';
import { FetcherService } from './fetcher.service';
import { ConfigService } from '../config/config.service';

@Global()
@Module({
  providers: [FetcherService, ConfigService]
})
export class FetcherModule {}
