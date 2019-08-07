import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { FetcherService } from '../fetcher/fetcher.service';
import { Request } from 'express';

describe('UsersService', (): void => {
    let service: UsersService;
    let fetchMock: jest.Mock = jest.fn();

    beforeEach(
        async (): Promise<void> => {
            const module: TestingModule = await Test.createTestingModule({
                providers: [
                    UsersService,
                    {
                        provide: FetcherService,
                        useValue: {
                            fetch: fetchMock,
                            fetcher: {
                                user: {
                                    getProfile: jest.fn(),
                                    getPublicRepositoryOwnerships: jest.fn(),
                                    getOrganizationMemberships: jest.fn()
                                }
                            }
                        }
                    }
                ]
            }).compile();

            service = module.get<UsersService>(UsersService);
        }
    );

    it('should be defined', (): void => {
        expect(service).toBeDefined();
    });

    describe('getUser', (): void => {
        it('should call fetch method on FetcherService', async (): Promise<void> => {
            await service.getUser(({} as unknown) as Request, 'dummy-username');

            expect(fetchMock).toHaveBeenCalled();
        });
    });

    describe('getUsersRepositories', (): void => {
        it('should call fetch method on FetcherService', async (): Promise<void> => {
            await service.getUsersRepositories(({} as unknown) as Request, 'dummy-username');

            expect(fetchMock).toHaveBeenCalled();
        });
    });

    describe('getUsersOrganizationMemberships', (): void => {
        it('should call fetch method on FetcherService', async (): Promise<void> => {
            await service.getUsersOrganizationMemberships(({} as unknown) as Request, 'dummy-username');

            expect(fetchMock).toHaveBeenCalled();
        });
    });
});
