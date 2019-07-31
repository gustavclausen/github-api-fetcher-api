import { Test, TestingModule } from '@nestjs/testing';
import { FetcherService } from './fetcher.service';

describe('FetcherService', (): void => {
    let service: FetcherService;

    beforeEach(
        async (): Promise<void> => {
            const module: TestingModule = await Test.createTestingModule({
                providers: [FetcherService]
            }).compile();

            service = module.get<FetcherService>(FetcherService);
        }
    );

    it('should be defined', (): void => {
        expect(service).toBeDefined();
    });
});
