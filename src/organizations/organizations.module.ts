import { Module, MiddlewareConsumer } from '@nestjs/common';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './organizations.service';
import { AccessTokenCheckMiddleware } from '../middleware/access-token-check/access-token-check.middleware';
import { FetcherModule } from '../fetcher/fetcher.module';

@Module({
    imports: [FetcherModule],
    controllers: [OrganizationsController],
    providers: [OrganizationsService]
})
export class OrganizationsModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(AccessTokenCheckMiddleware).forRoutes('*');
    }
}
