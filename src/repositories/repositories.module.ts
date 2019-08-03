import { Module, MiddlewareConsumer } from '@nestjs/common';
import { RepositoriesController } from './repositories.controller';
import { RepositoriesService } from './repositories.service';
import { AccessTokenCheckMiddleware } from '../middleware/access-token-check/access-token-check.middleware';

@Module({
    controllers: [RepositoriesController],
    providers: [RepositoriesService]
})
export class RepositoriesModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(AccessTokenCheckMiddleware).forRoutes('*');
    }
}
