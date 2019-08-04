import { Test, TestingModule } from '@nestjs/testing';
import { GistsService } from './gists.service';
import { FetcherService } from '../fetcher/fetcher.service';
import { Request } from 'express';

describe('GistsService', (): void => {
    let service: GistsService;
    let fetchMock: jest.Mock = jest.fn();

    beforeEach(
        async (): Promise<void> => {
            const module: TestingModule = await Test.createTestingModule({
                providers: [
                    GistsService,
                    {
                        provide: FetcherService,
                        useValue: {
                            fetch: fetchMock,
                            fetcher: { gist: { getProfile: jest.fn() } }
                        }
                    }
                ]
            }).compile();

            service = module.get<GistsService>(GistsService);
        }
    );

    it('should be defined', (): void => {
        expect(service).toBeDefined();
    });

    describe('getGist', (): void => {
        it('should call fetch method on FetcherService', async (): Promise<void> => {
            await service.getGist(({} as unknown) as Request, 'dummy-username', 'dummy-gist');

            expect(fetchMock).toHaveBeenCalled();
        });
    });
});
