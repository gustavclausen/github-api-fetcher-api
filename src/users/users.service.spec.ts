import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { FetcherService } from '../fetcher/fetcher.service';
import { Request } from 'express';
import { Month } from 'github-api-fetcher';

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
                                    getOrganizationMemberships: jest.fn(),
                                    getPublicGists: jest.fn(),
                                    getCommitContributionsInMonth: jest.fn(),
                                    getCommitContributionsInYear: jest.fn(),
                                    getContributionYears: jest.fn(),
                                    getIssueContributionsInMonth: jest.fn(),
                                    getIssueContributionsInYear: jest.fn(),
                                    getPullRequestContributionsInMonth: jest.fn(),
                                    getPullRequestContributionsInYear: jest.fn(),
                                    getPullRequestReviewContributionsInMonth: jest.fn(),
                                    getPullRequestReviewContributionsInYear: jest.fn()
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

    describe('getUsersGists', (): void => {
        it('should call fetch method on FetcherService', async (): Promise<void> => {
            await service.getUsersGists(({} as unknown) as Request, 'dummy-username');

            expect(fetchMock).toHaveBeenCalled();
        });
    });

    describe('getUsersCommitContributionsInMonth', (): void => {
        it('should call fetch method on FetcherService', async (): Promise<void> => {
            await service.getUsersCommitContributionsInMonth(
                ({} as unknown) as Request,
                'dummy-username',
                2019,
                Month.APRIL
            );

            expect(fetchMock).toHaveBeenCalled();
        });
    });

    describe('getUsersCommitContributionsInYear', (): void => {
        it('should call fetch method on FetcherService', async (): Promise<void> => {
            await service.getUsersCommitContributionsInYear(({} as unknown) as Request, 'dummy-username', 2019);

            expect(fetchMock).toHaveBeenCalled();
        });
    });

    describe('getUsersContributionYears', (): void => {
        it('should call fetch method on FetcherService', async (): Promise<void> => {
            await service.getUsersContributionYears(({} as unknown) as Request, 'dummy-username');

            expect(fetchMock).toHaveBeenCalled();
        });
    });

    describe('getUsersIssueContributionsInMonth', (): void => {
        it('should call fetch method on FetcherService', async (): Promise<void> => {
            await service.getUsersIssueContributionsInMonth(
                ({} as unknown) as Request,
                'dummy-username',
                2019,
                Month.APRIL
            );

            expect(fetchMock).toHaveBeenCalled();
        });
    });

    describe('getUsersIssueContributionsInYear', (): void => {
        it('should call fetch method on FetcherService', async (): Promise<void> => {
            await service.getUsersIssueContributionsInYear(({} as unknown) as Request, 'dummy-username', 2019);

            expect(fetchMock).toHaveBeenCalled();
        });
    });

    describe('getUsersPullRequestContributionsInMonth', (): void => {
        it('should call fetch method on FetcherService', async (): Promise<void> => {
            await service.getUsersPullRequestContributionsInMonth(
                ({} as unknown) as Request,
                'dummy-username',
                2019,
                Month.APRIL
            );

            expect(fetchMock).toHaveBeenCalled();
        });
    });

    describe('getUsersPullRequestContributionsInYear', (): void => {
        it('should call fetch method on FetcherService', async (): Promise<void> => {
            await service.getUsersPullRequestContributionsInYear(({} as unknown) as Request, 'dummy-username', 2019);

            expect(fetchMock).toHaveBeenCalled();
        });
    });

    describe('getUsersPullRequestReviewContributionsInMonth', (): void => {
        it('should call fetch method on FetcherService', async (): Promise<void> => {
            await service.getUsersPullRequestContributionsInMonth(
                ({} as unknown) as Request,
                'dummy-username',
                2019,
                Month.APRIL
            );

            expect(fetchMock).toHaveBeenCalled();
        });
    });

    describe('getUsersPullRequestReviewContributionsInYear', (): void => {
        it('should call fetch method on FetcherService', async (): Promise<void> => {
            await service.getUsersPullRequestReviewContributionsInYear(
                ({} as unknown) as Request,
                'dummy-username',
                2019
            );

            expect(fetchMock).toHaveBeenCalled();
        });
    });
});
