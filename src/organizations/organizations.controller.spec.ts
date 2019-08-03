import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './organizations.service';
import { FetcherService } from '../fetcher/fetcher.service';
import { Request } from 'express';
import { NotFoundException } from '@nestjs/common';
import { OrganizationProfile } from 'github-api-fetcher';

describe('Organizations Controller', (): void => {
    let controller: OrganizationsController;
    let organizationsService: OrganizationsService;

    beforeEach(
        async (): Promise<void> => {
            const module: TestingModule = await Test.createTestingModule({
                controllers: [OrganizationsController],
                providers: [
                    OrganizationsService,
                    {
                        provide: FetcherService,
                        useValue: { fetch: jest.fn() }
                    }
                ]
            }).compile();

            controller = module.get<OrganizationsController>(OrganizationsController);
            organizationsService = module.get<OrganizationsService>(OrganizationsService);
        }
    );

    it('should be defined', (): void => {
        expect(controller).toBeDefined();
    });

    describe('getOrganization', (): void => {
        it('should throw NotFoundException when OrganizationsService returns null', async (): Promise<void> => {
            jest.spyOn(organizationsService, 'getOrganization').mockReturnValue(
                new Promise((resolve): void => resolve(null))
            );

            await expect(controller.getOrganization(({} as unknown) as Request, 'dummy-username')).rejects.toThrowError(
                NotFoundException
            );
        });

        it('should return result from OrganizationsService', async (): Promise<void> => {
            const organzationName = 'test-organzation';
            const returnValue = ({ name: organzationName } as unknown) as OrganizationProfile;

            jest.spyOn(organizationsService, 'getOrganization').mockReturnValue(
                new Promise(
                    (resolve): void => {
                        resolve(returnValue);
                    }
                )
            );

            expect(await controller.getOrganization(({} as unknown) as Request, organzationName)).toBe(returnValue);
        });
    });
});
