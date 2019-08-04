import { Module, MiddlewareConsumer } from '@nestjs/common';
import { GistsService } from './gists.service';
import { GistsController } from './gists.controller';
import { FetcherModule } from '../fetcher/fetcher.module';
import { AccessTokenCheckMiddleware } from '../middleware/access-token-check/access-token-check.middleware';

@Module({
    imports: [FetcherModule],
    providers: [GistsService],
    controllers: [GistsController]
})
export class GistsModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(AccessTokenCheckMiddleware).forRoutes('*');
    }
}
