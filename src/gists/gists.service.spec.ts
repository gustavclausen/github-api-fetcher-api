import { Test, TestingModule } from '@nestjs/testing';
import { GistsService } from './gists.service';

describe('GistsService', (): void => {
    let service: GistsService;

    beforeEach(
        async (): Promise<void> => {
            const module: TestingModule = await Test.createTestingModule({
                providers: [GistsService]
            }).compile();

            service = module.get<GistsService>(GistsService);
        }
    );

    it('should be defined', (): void => {
        expect(service).toBeDefined();
    });
});
