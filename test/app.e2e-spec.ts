import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', (): void => {
    let app;

    beforeEach(
        async (): Promise<void> => {
            const moduleFixture: TestingModule = await Test.createTestingModule({
                imports: [AppModule]
            }).compile();

            app = moduleFixture.createNestApplication();
            await app.init();
        }
    );
});
