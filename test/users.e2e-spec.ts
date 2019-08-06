import request from 'supertest';
import uuid from 'uuid';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from '../src/users/users.module';
import { buildGetRequest, buildUnauthorizedGetRequest } from './utils';

describe('UsersController (e2e)', (): void => {
    let app: INestApplication;

    beforeEach(
        async (): Promise<void> => {
            const testModule: TestingModule = await Test.createTestingModule({
                imports: [UsersModule]
            }).compile();

            app = testModule.createNestApplication();
            await app.init();
        }
    );

    describe('GET /:username', (): void => {
        const sendRequest = async (resourcePath: string): Promise<request.Response> => {
            return await buildGetRequest(app, resourcePath);
        };

        it('should return 401 if no access token is passed', async (): Promise<void> => {
            const response = await buildUnauthorizedGetRequest(app, '/users/dummy-user');

            expect(response.status).toBe(401);
        });

        it('should return user if existing username is passed', async (): Promise<void> => {
            const username = 'torvalds';
            const response = await sendRequest(`/users/${username}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('username', username);
        });

        it('should return 404 if non-existing username is passed', async (): Promise<void> => {
            const nonExistingUsername = uuid();
            const response = await sendRequest(`/users/${nonExistingUsername}`);

            expect(response.status).toBe(404);
        });

        describe('GET /:username/repositories', (): void => {
            it('should return 401 if no access token is passed', async (): Promise<void> => {
                const response = await buildUnauthorizedGetRequest(app, '/users/dummy-user/repositories');

                expect(response.status).toBe(401);
            });

            it('should return repositories if existing username is passed', async (): Promise<void> => {
                const response = await sendRequest('/users/torvalds/repositories');

                expect(response.status).toBe(200);
                expect(response.body.length).toBeGreaterThan(0);
            });

            it('should return 404 if non-existing username is passed', async (): Promise<void> => {
                const nonExistingUsername = uuid();
                const response = await sendRequest(`/users/${nonExistingUsername}/repositories`);

                expect(response.status).toBe(404);
            });
        });
    });

    afterAll(
        async (): Promise<void> => {
            await app.close();
        }
    );
});
