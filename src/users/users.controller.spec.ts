import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { FetcherService } from '../fetcher/fetcher.service';
import { Request } from 'express';
import { NotFoundException } from '@nestjs/common';
import { UserProfile, RepositoryProfileMinified } from 'github-api-fetcher';

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
});
