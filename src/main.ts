import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import { AccessTokenCheckMiddleware } from './middleware/access-token-check/access-token-check.middleware';
import { env } from './constants';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);
    const port = app.get<ConfigService>('ConfigService').getValue(env.PORT);

    app.setGlobalPrefix('api');
    app.use(new AccessTokenCheckMiddleware().use, helmet());

    await app.listen(port).then((): void => console.log(`Server running on port ${port}`));
}
bootstrap();
