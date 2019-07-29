import { Test, TestingModule } from '@nestjs/testing';
import { FetcherService } from './fetcher.service';
import { ConfigService } from '../config/config.service';

describe('FetcherService', () => {
  let service: FetcherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FetcherService, ConfigService]
    }).compile();

    service = module.get<FetcherService>(FetcherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
