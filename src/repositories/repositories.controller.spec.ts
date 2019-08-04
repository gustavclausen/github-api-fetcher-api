import { Test, TestingModule } from '@nestjs/testing';
import { RepositoriesController } from './repositories.controller';
import { RepositoriesService } from './repositories.service';
import { FetcherService } from '../fetcher/fetcher.service';
import { Request } from 'express';
import { NotFoundException } from '@nestjs/common';
import { RepositoryProfile } from 'github-api-fetcher';
import { RepositoryQueryDto } from './dto/RepositoryQueryDto';

describe('Repositories Controller', (): void => {
    let controller: RepositoriesController;
    let repositoryService: RepositoriesService;

    beforeEach(
        async (): Promise<void> => {
            const module: TestingModule = await Test.createTestingModule({
                controllers: [RepositoriesController],
                providers: [
                    RepositoriesService,
                    {
                        provide: FetcherService,
                        useValue: { fetch: jest.fn() }
                    }
                ]
            }).compile();

            controller = module.get<RepositoriesController>(RepositoriesController);
            repositoryService = module.get<RepositoriesService>(RepositoriesService);
        }
    );

    it('should be defined', (): void => {
        expect(controller).toBeDefined();
    });

    describe('getRepository', (): void => {
        it('should throw NotFoundException when RepositoriesService returns null', async (): Promise<void> => {
            jest.spyOn(repositoryService, 'getRepository').mockReturnValue(
                new Promise((resolve): void => resolve(null))
            );

            await expect(
                controller.getRepository(({} as unknown) as Request, {
                    ownerName: 'dummy-user',
                    repositoryName: 'dummy-repository'
                })
            ).rejects.toThrowError(NotFoundException);
        });

        it('should return result from RepositoriesService', async (): Promise<void> => {
            const query: RepositoryQueryDto = { ownerName: 'dummy-user', repositoryName: 'dummy-repository' };
            const returnValue = ({
                ownerName: query.ownerName,
                name: query.repositoryName
            } as unknown) as RepositoryProfile;

            jest.spyOn(repositoryService, 'getRepository').mockReturnValue(
                new Promise(
                    (resolve): void => {
                        resolve(returnValue);
                    }
                )
            );

            expect(await controller.getRepository(({} as unknown) as Request, query)).toBe(returnValue);
        });
    });
});
