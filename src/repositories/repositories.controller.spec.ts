import { Test, TestingModule } from '@nestjs/testing';
import { RepositoriesController } from './repositories.controller';

describe('Repositories Controller', (): void => {
    let controller: RepositoriesController;

    beforeEach(
        async (): Promise<void> => {
            const module: TestingModule = await Test.createTestingModule({
                controllers: [RepositoriesController]
            }).compile();

            controller = module.get<RepositoriesController>(RepositoriesController);
        }
    );

    it('should be defined', (): void => {
        expect(controller).toBeDefined();
    });
});
