import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { FetcherService } from '../fetcher/fetcher.service';
import { Request } from 'express';
import { NotFoundException } from '@nestjs/common';
import { MonthQueryDto } from './dto/MonthQueryDto';
import { YearQueryDto } from './dto/YearQueryDto';
import {
    UserProfile,
    RepositoryProfileMinified,
    OrganizationProfileMinified,
    GistProfileMinified,
    Month,
    MonthlyContributions,
    MonthlyPullRequestContributions
} from 'github-api-fetcher';

describe('Users Controller', (): void => {
    let controller: UsersController;
    let userService: UsersService;

    beforeEach(
        async (): Promise<void> => {
            const module: TestingModule = await Test.createTestingModule({
                controllers: [UsersController],
                providers: [
                    UsersService,
                    {
                        provide: FetcherService,
                        useValue: { fetch: jest.fn() }
                    }
                ]
            }).compile();

            controller = module.get<UsersController>(UsersController);
            userService = module.get<UsersService>(UsersService);
        }
    );

    it('should be defined', (): void => {
        expect(controller).toBeDefined();
    });

    describe('getUser', (): void => {
        it('should throw NotFoundException when UsersService returns null', async (): Promise<void> => {
            jest.spyOn(userService, 'getUser').mockReturnValue(new Promise((resolve): void => resolve(null)));

            await expect(controller.getUser(({} as unknown) as Request, 'dummy-username')).rejects.toThrowError(
                NotFoundException
            );
        });

        it('should return result from UsersService', async (): Promise<void> => {
            const username = 'test-user';
            const returnValue = ({ username } as unknown) as UserProfile;

            jest.spyOn(userService, 'getUser').mockReturnValue(
                new Promise(
                    (resolve): void => {
                        resolve(returnValue);
                    }
                )
            );

            expect(await controller.getUser(({} as unknown) as Request, username)).toBe(returnValue);
        });
    });

    describe('getUsersRepositories', (): void => {
        it('should throw NotFoundException when UsersService returns null', async (): Promise<void> => {
            jest.spyOn(userService, 'getUsersRepositories').mockReturnValue(
                new Promise((resolve): void => resolve(null))
            );

            await expect(
                controller.getUsersRepositories(({} as unknown) as Request, 'dummy-username')
            ).rejects.toThrowError(NotFoundException);
        });

        it('should return result from UsersService', async (): Promise<void> => {
            const returnValue = [
                ({
                    gitHubId: 'some-id'
                } as unknown) as RepositoryProfileMinified
            ];

            jest.spyOn(userService, 'getUsersRepositories').mockReturnValue(
                new Promise(
                    (resolve): void => {
                        resolve(returnValue);
                    }
                )
            );

            expect(await controller.getUsersRepositories(({} as unknown) as Request, 'test-user')).toBe(returnValue);
        });
    });

    describe('getUsersOrganizationMemberships', (): void => {
        it('should throw NotFoundException when UsersService returns null', async (): Promise<void> => {
            jest.spyOn(userService, 'getUsersOrganizationMemberships').mockReturnValue(
                new Promise((resolve): void => resolve(null))
            );

            await expect(
                controller.getUsersOrganizationMemberships(({} as unknown) as Request, 'dummy-username')
            ).rejects.toThrowError(NotFoundException);
        });

        it('should return result from UsersService', async (): Promise<void> => {
            const returnValue = [
                ({
                    gitHubId: 'some-id'
                } as unknown) as OrganizationProfileMinified
            ];

            jest.spyOn(userService, 'getUsersOrganizationMemberships').mockReturnValue(
                new Promise(
                    (resolve): void => {
                        resolve(returnValue);
                    }
                )
            );

            expect(await controller.getUsersOrganizationMemberships(({} as unknown) as Request, 'test-user')).toBe(
                returnValue
            );
        });
    });

    describe('getUsersGists', (): void => {
        it('should throw NotFoundException when UsersService returns null', async (): Promise<void> => {
            jest.spyOn(userService, 'getUsersGists').mockReturnValue(new Promise((resolve): void => resolve(null)));

            await expect(controller.getUsersGists(({} as unknown) as Request, 'dummy-username')).rejects.toThrowError(
                NotFoundException
            );
        });

        it('should return result from UsersService', async (): Promise<void> => {
            const returnValue = [
                ({
                    gitHubId: 'some-id'
                } as unknown) as GistProfileMinified
            ];

            jest.spyOn(userService, 'getUsersGists').mockReturnValue(
                new Promise(
                    (resolve): void => {
                        resolve(returnValue);
                    }
                )
            );

            expect(await controller.getUsersGists(({} as unknown) as Request, 'test-user')).toBe(returnValue);
        });
    });

    describe('getUsersCommitContributionsInMonth', (): void => {
        it('should throw NotFoundException when UsersService returns null', async (): Promise<void> => {
            jest.spyOn(userService, 'getUsersCommitContributionsInMonth').mockReturnValue(
                new Promise((resolve): void => resolve(null))
            );

            await expect(
                controller.getUsersCommitContributionsInMonth(({} as unknown) as Request, 'dummy-username', {
                    month: Month.AUGUST,
                    year: 2019
                })
            ).rejects.toThrowError(NotFoundException);
        });

        it('should return result from UsersService', async (): Promise<void> => {
            const query: MonthQueryDto = { month: Month.APRIL, year: 2011 };
            const returnValue = ({
                month: 'APRIL'
            } as unknown) as MonthlyContributions;

            jest.spyOn(userService, 'getUsersCommitContributionsInMonth').mockReturnValue(
                new Promise(
                    (resolve): void => {
                        resolve(returnValue);
                    }
                )
            );

            expect(
                await controller.getUsersCommitContributionsInMonth(({} as unknown) as Request, 'test-user', query)
            ).toBe(returnValue);
        });
    });

    describe('getUsersCommitContributionsInYear', (): void => {
        it('should throw NotFoundException when UsersService returns null', async (): Promise<void> => {
            jest.spyOn(userService, 'getUsersCommitContributionsInYear').mockReturnValue(
                new Promise((resolve): void => resolve(null))
            );

            await expect(
                controller.getUsersCommitContributionsInYear(({} as unknown) as Request, 'dummy-username', {
                    year: 2019
                })
            ).rejects.toThrowError(NotFoundException);
        });

        it('should return result from UsersService', async (): Promise<void> => {
            const query: YearQueryDto = { year: 2011 };
            const returnValue = [
                ({
                    month: 'JANUARY'
                } as unknown) as MonthlyContributions
            ];

            jest.spyOn(userService, 'getUsersCommitContributionsInYear').mockReturnValue(
                new Promise(
                    (resolve): void => {
                        resolve(returnValue);
                    }
                )
            );

            expect(
                await controller.getUsersCommitContributionsInYear(({} as unknown) as Request, 'test-user', query)
            ).toBe(returnValue);
        });
    });

    describe('getUsersContributionYears', (): void => {
        it('should throw NotFoundException when UsersService returns null', async (): Promise<void> => {
            jest.spyOn(userService, 'getUsersContributionYears').mockReturnValue(
                new Promise((resolve): void => resolve(null))
            );

            await expect(
                controller.getUsersContributionYears(({} as unknown) as Request, 'dummy-username')
            ).rejects.toThrowError(NotFoundException);
        });

        it('should return result from UsersService', async (): Promise<void> => {
            const returnValue = [2019, 2018];

            jest.spyOn(userService, 'getUsersContributionYears').mockReturnValue(
                new Promise(
                    (resolve): void => {
                        resolve(returnValue);
                    }
                )
            );

            expect(await controller.getUsersContributionYears(({} as unknown) as Request, 'test-user')).toBe(
                returnValue
            );
        });
    });

    describe('getUsersIssueContributionsInMonth', (): void => {
        it('should throw NotFoundException when UsersService returns null', async (): Promise<void> => {
            jest.spyOn(userService, 'getUsersIssueContributionsInMonth').mockReturnValue(
                new Promise((resolve): void => resolve(null))
            );

            await expect(
                controller.getUsersIssueContributionsInMonth(({} as unknown) as Request, 'dummy-username', {
                    month: Month.AUGUST,
                    year: 2019
                })
            ).rejects.toThrowError(NotFoundException);
        });

        it('should return result from UsersService', async (): Promise<void> => {
            const query: MonthQueryDto = { month: Month.APRIL, year: 2011 };
            const returnValue = ({
                month: 'APRIL'
            } as unknown) as MonthlyContributions;

            jest.spyOn(userService, 'getUsersIssueContributionsInMonth').mockReturnValue(
                new Promise(
                    (resolve): void => {
                        resolve(returnValue);
                    }
                )
            );

            expect(
                await controller.getUsersIssueContributionsInMonth(({} as unknown) as Request, 'test-user', query)
            ).toBe(returnValue);
        });
    });

    describe('getUsersIssueContributionsInYear', (): void => {
        it('should throw NotFoundException when UsersService returns null', async (): Promise<void> => {
            jest.spyOn(userService, 'getUsersIssueContributionsInYear').mockReturnValue(
                new Promise((resolve): void => resolve(null))
            );

            await expect(
                controller.getUsersIssueContributionsInYear(({} as unknown) as Request, 'dummy-username', {
                    year: 2019
                })
            ).rejects.toThrowError(NotFoundException);
        });

        it('should return result from UsersService', async (): Promise<void> => {
            const query: YearQueryDto = { year: 2011 };
            const returnValue = [
                ({
                    month: 'JANUARY'
                } as unknown) as MonthlyContributions
            ];

            jest.spyOn(userService, 'getUsersIssueContributionsInYear').mockReturnValue(
                new Promise(
                    (resolve): void => {
                        resolve(returnValue);
                    }
                )
            );

            expect(
                await controller.getUsersIssueContributionsInYear(({} as unknown) as Request, 'test-user', query)
            ).toBe(returnValue);
        });
    });

    describe('getUsersPullRequestContributionsInMonth', (): void => {
        it('should throw NotFoundException when UsersService returns null', async (): Promise<void> => {
            jest.spyOn(userService, 'getUsersPullRequestContributionsInMonth').mockReturnValue(
                new Promise((resolve): void => resolve(null))
            );

            await expect(
                controller.getUsersPullRequestContributionsInMonth(({} as unknown) as Request, 'dummy-username', {
                    month: Month.AUGUST,
                    year: 2019
                })
            ).rejects.toThrowError(NotFoundException);
        });

        it('should return result from UsersService', async (): Promise<void> => {
            const query: MonthQueryDto = { month: Month.APRIL, year: 2011 };
            const returnValue = ({
                month: 'APRIL'
            } as unknown) as MonthlyPullRequestContributions;

            jest.spyOn(userService, 'getUsersPullRequestContributionsInMonth').mockReturnValue(
                new Promise(
                    (resolve): void => {
                        resolve(returnValue);
                    }
                )
            );

            expect(
                await controller.getUsersPullRequestContributionsInMonth(({} as unknown) as Request, 'test-user', query)
            ).toBe(returnValue);
        });
    });

    describe('getUsersPullRequestContributionsInYear', (): void => {
        it('should throw NotFoundException when UsersService returns null', async (): Promise<void> => {
            jest.spyOn(userService, 'getUsersPullRequestContributionsInYear').mockReturnValue(
                new Promise((resolve): void => resolve(null))
            );

            await expect(
                controller.getUsersPullRequestContributionsInYear(({} as unknown) as Request, 'dummy-username', {
                    year: 2019
                })
            ).rejects.toThrowError(NotFoundException);
        });

        it('should return result from UsersService', async (): Promise<void> => {
            const query: YearQueryDto = { year: 2011 };
            const returnValue = [
                ({
                    month: 'JANUARY'
                } as unknown) as MonthlyPullRequestContributions
            ];

            jest.spyOn(userService, 'getUsersPullRequestContributionsInYear').mockReturnValue(
                new Promise(
                    (resolve): void => {
                        resolve(returnValue);
                    }
                )
            );

            expect(
                await controller.getUsersPullRequestContributionsInYear(({} as unknown) as Request, 'test-user', query)
            ).toBe(returnValue);
        });
    });

    describe('getUsersPullRequestReviewContributionsInMonth', (): void => {
        it('should throw NotFoundException when UsersService returns null', async (): Promise<void> => {
            jest.spyOn(userService, 'getUsersPullRequestReviewContributionsInMonth').mockReturnValue(
                new Promise((resolve): void => resolve(null))
            );

            await expect(
                controller.getUsersPullRequestReviewContributionsInMonth(({} as unknown) as Request, 'dummy-username', {
                    month: Month.AUGUST,
                    year: 2019
                })
            ).rejects.toThrowError(NotFoundException);
        });

        it('should return result from UsersService', async (): Promise<void> => {
            const query: MonthQueryDto = { month: Month.APRIL, year: 2011 };
            const returnValue = ({
                month: 'APRIL'
            } as unknown) as MonthlyContributions;

            jest.spyOn(userService, 'getUsersPullRequestReviewContributionsInMonth').mockReturnValue(
                new Promise(
                    (resolve): void => {
                        resolve(returnValue);
                    }
                )
            );

            expect(
                await controller.getUsersPullRequestReviewContributionsInMonth(
                    ({} as unknown) as Request,
                    'test-user',
                    query
                )
            ).toBe(returnValue);
        });
    });

    describe('getUsersPullRequestReviewContributionsInYear', (): void => {
        it('should throw NotFoundException when UsersService returns null', async (): Promise<void> => {
            jest.spyOn(userService, 'getUsersPullRequestReviewContributionsInYear').mockReturnValue(
                new Promise((resolve): void => resolve(null))
            );

            await expect(
                controller.getUsersPullRequestReviewContributionsInYear(({} as unknown) as Request, 'dummy-username', {
                    year: 2019
                })
            ).rejects.toThrowError(NotFoundException);
        });

        it('should return result from UsersService', async (): Promise<void> => {
            const query: YearQueryDto = { year: 2011 };
            const returnValue = [
                ({
                    month: 'JANUARY'
                } as unknown) as MonthlyContributions
            ];

            jest.spyOn(userService, 'getUsersPullRequestReviewContributionsInYear').mockReturnValue(
                new Promise(
                    (resolve): void => {
                        resolve(returnValue);
                    }
                )
            );

            expect(
                await controller.getUsersPullRequestReviewContributionsInYear(
                    ({} as unknown) as Request,
                    'test-user',
                    query
                )
            ).toBe(returnValue);
        });
    });
});
