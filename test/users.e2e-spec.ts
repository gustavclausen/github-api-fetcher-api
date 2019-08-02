import request from 'supertest';
import uuid from 'uuid';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from '../src/users/users.module';
import { ConfigService } from '../src/config/config.service';
import { env, request as constantsRequest } from '../src/constants';

describe('UsersController (e2e)', (): void => {
    let app: INestApplication;
    let validAccessToken: string;

    beforeEach(
        async (): Promise<void> => {
            const testModule: TestingModule = await Test.createTestingModule({
                imports: [UsersModule]
            }).compile();

            app = testModule.createNestApplication();
            await app.init();

            const configService = testModule.get<ConfigService>(ConfigService);
            validAccessToken = configService.getValue(env.GITHUB_API_ACCESS_TOKEN) as string;
        }
    );

    describe('GET /:username', (): void => {
        const sendValidRequest = async (username: string): Promise<request.Response> => {
            return await request(app.getHttpServer())
                .get(`/users/${username}`)
                .set(constantsRequest.ACCESS_TOKEN_HEADER, validAccessToken);
        };

        it('should return 401 if no access token is passed', async (): Promise<void> => {
            const response = await request(app.getHttpServer())
                .get(`/users/dummy-user`)
                .set(constantsRequest.ACCESS_TOKEN_HEADER, '');

            expect(response.status).toBe(401);
        });

        it('should return user if existing username is passed', async (): Promise<void> => {
            const username = 'torvalds';
            const response = await sendValidRequest(username);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('username', username);
        });

        it('should return 404 if non-existing username is passed', async (): Promise<void> => {
            const nonExistingUsername = uuid();
            const response = await sendValidRequest(nonExistingUsername);

            expect(response.status).toBe(404);
        });
    });

    afterAll(
        async (): Promise<void> => {
            await app.close();
        }
    );
});
