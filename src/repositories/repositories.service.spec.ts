import { Test, TestingModule } from '@nestjs/testing';
import { RepositoriesService } from './repositories.service';

describe('RepositoriesService', (): void => {
    let service: RepositoriesService;

    beforeEach(
        async (): Promise<void> => {
            const module: TestingModule = await Test.createTestingModule({
                providers: [RepositoriesService]
            }).compile();

            service = module.get<RepositoriesService>(RepositoriesService);
        }
    );

    it('should be defined', (): void => {
        expect(service).toBeDefined();
    });
});
