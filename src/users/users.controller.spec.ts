import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ConfigService } from '../config/config.service';
import { FetcherService } from '../fetcher/fetcher.service';

describe('User Controller', (): void => {
    let controller: UsersController;

    beforeEach(
        async (): Promise<void> => {
            const module: TestingModule = await Test.createTestingModule({
                controllers: [UsersController],
                providers: [UsersService, FetcherService, ConfigService]
            }).compile();

            controller = module.get<UsersController>(UsersController);
        }
    );

    it('should be defined', (): void => {
        expect(controller).toBeDefined();
    });
});
