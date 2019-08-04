import { Test, TestingModule } from '@nestjs/testing';
import { GistsController } from './gists.controller';

describe('Gists Controller', (): void => {
    let controller: GistsController;

    beforeEach(
        async (): Promise<void> => {
            const module: TestingModule = await Test.createTestingModule({
                controllers: [GistsController]
            }).compile();

            controller = module.get<GistsController>(GistsController);
        }
    );

    it('should be defined', (): void => {
        expect(controller).toBeDefined();
    });
});
