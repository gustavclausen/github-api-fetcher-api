import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from './config.service';

describe('ConfigService', (): void => {
    let service: ConfigService;

    beforeEach(
        async (): Promise<void> => {
            const module: TestingModule = await Test.createTestingModule({
                providers: [ConfigService]
            }).compile();

            service = module.get<ConfigService>(ConfigService);
        }
    );

    it('should be defined', (): void => {
        expect(service).toBeDefined();
    });
});
