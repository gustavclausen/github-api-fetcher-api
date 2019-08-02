import { Module, MiddlewareConsumer } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { FetcherModule } from '../fetcher/fetcher.module';
import { AccessTokenCheckMiddleware } from '../middleware/access-token-check/access-token-check.middleware';

@Module({
    imports: [FetcherModule],
    controllers: [UsersController],
    providers: [UsersService]
})
export class UsersModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(AccessTokenCheckMiddleware).forRoutes('*');
    }
}
