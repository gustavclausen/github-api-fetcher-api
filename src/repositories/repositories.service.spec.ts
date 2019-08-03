import { Test, TestingModule } from '@nestjs/testing';
import { RepositoriesService } from './repositories.service';
import { FetcherService } from '../fetcher/fetcher.service';
import { Request } from 'express';

describe('RepositoriesService', (): void => {
    let service: RepositoriesService;
    let fetchMock: jest.Mock = jest.fn();

    beforeEach(
        async (): Promise<void> => {
            const module: TestingModule = await Test.createTestingModule({
                providers: [
                    RepositoriesService,
                    {
                        provide: FetcherService,
                        useValue: {
                            fetch: fetchMock,
                            fetcher: { repository: { getProfile: jest.fn() } }
                        }
                    }
                ]
            }).compile();

            service = module.get<RepositoriesService>(RepositoriesService);
        }
    );

    it('should be defined', (): void => {
        expect(service).toBeDefined();
    });

    describe('getRepository', (): void => {
        it('should call fetch method on FetcherService', async (): Promise<void> => {
            await service.getRepository(({} as unknown) as Request, 'dummy-username', 'dummy-repository');

            expect(fetchMock).toHaveBeenCalled();
        });
    });
});
