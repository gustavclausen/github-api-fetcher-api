import { Test, TestingModule } from '@nestjs/testing';
import { GistsController } from './gists.controller';
import { GistsService } from './gists.service';
import { FetcherService } from '../fetcher/fetcher.service';
import { Request } from 'express';
import { NotFoundException } from '@nestjs/common';
import { GistQueryDto } from './dto/GistQueryDto';
import { GistProfile } from 'github-api-fetcher';

describe('Gists Controller', (): void => {
    let controller: GistsController;
    let gistsService: GistsService;

    beforeEach(
        async (): Promise<void> => {
            const module: TestingModule = await Test.createTestingModule({
                controllers: [GistsController],
                providers: [
                    GistsService,
                    {
                        provide: FetcherService,
                        useValue: { fetch: jest.fn() }
                    }
                ]
            }).compile();

            controller = module.get<GistsController>(GistsController);
            gistsService = module.get<GistsService>(GistsService);
        }
    );

    it('should be defined', (): void => {
        expect(controller).toBeDefined();
    });

    describe('getGist', (): void => {
        it('should throw NotFoundException when GistsService returns null', async (): Promise<void> => {
            jest.spyOn(gistsService, 'getGist').mockReturnValue(new Promise((resolve): void => resolve(null)));

            await expect(
                controller.getGist(({} as unknown) as Request, {
                    ownerUsername: 'dummy-user',
                    gistName: 'dummy-gist'
                })
            ).rejects.toThrowError(NotFoundException);
        });

        it('should return result from GistsService', async (): Promise<void> => {
            const query: GistQueryDto = { ownerUsername: 'dummy-user', gistName: 'dummy-gist' };
            const returnValue = ({
                ownerName: query.ownerUsername,
                name: query.gistName
            } as unknown) as GistProfile;

            jest.spyOn(gistsService, 'getGist').mockReturnValue(
                new Promise(
                    (resolve): void => {
                        resolve(returnValue);
                    }
                )
            );

            expect(await controller.getGist(({} as unknown) as Request, query)).toBe(returnValue);
        });
    });
});
