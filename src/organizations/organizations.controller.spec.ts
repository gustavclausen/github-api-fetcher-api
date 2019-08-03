import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationsController } from './organizations.controller';

describe('Organizations Controller', (): void => {
    let controller: OrganizationsController;

    beforeEach(
        async (): Promise<void> => {
            const module: TestingModule = await Test.createTestingModule({
                controllers: [OrganizationsController]
            }).compile();

            controller = module.get<OrganizationsController>(OrganizationsController);
        }
    );

    it('should be defined', (): void => {
        expect(controller).toBeDefined();
    });
});
