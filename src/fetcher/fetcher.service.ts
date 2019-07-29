import { Injectable } from '@nestjs/common';
import { APIFetcher } from 'github-api-fetcher';
import { ConfigService } from '../config/config.service';
import { env } from '../constants';

@Injectable()
export class FetcherService {
  readonly fetcher: APIFetcher;

  constructor(config: ConfigService) {
    this.fetcher = new APIFetcher(config.getValue(env.GITHUB_API_ACCESS_TOKEN));
  }
}
