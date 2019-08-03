import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationsService } from './organizations.service';
import { FetcherService } from '../fetcher/fetcher.service';
import { Request } from 'express';

describe('OrganizationsService', (): void => {
    let service: OrganizationsService;
    let fetchMock: jest.Mock = jest.fn();

    beforeEach(
        async (): Promise<void> => {
            const module: TestingModule = await Test.createTestingModule({
                providers: [
                    OrganizationsService,
                    {
                        provide: FetcherService,
                        useValue: {
                            fetch: fetchMock,
                            fetcher: { organization: { getProfile: jest.fn() } }
                        }
                    }
                ]
            }).compile();

            service = module.get<OrganizationsService>(OrganizationsService);
        }
    );

    it('should be defined', (): void => {
        expect(service).toBeDefined();
    });

    describe('getOrganization', (): void => {
        it('should call fetch method on FetcherService', async (): Promise<void> => {
            await service.getOrganization(({} as unknown) as Request, 'dummy-organization');

            expect(fetchMock).toHaveBeenCalled();
        });
    });
});
