import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import { env } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = app.get<ConfigService>('ConfigService').getValue(env.PORT);

  app.setGlobalPrefix('api');

  await app.listen(port).then(() => console.log(`Server running on port ${port}`));
}
bootstrap();
