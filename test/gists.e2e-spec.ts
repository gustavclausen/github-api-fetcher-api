import request from 'supertest';
import uuid from 'uuid';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { GistsModule } from '../src/gists/gists.module';
import { buildGetRequest, buildUnauthorizedGetRequest } from './utils';

describe('GistsController (e2e)', (): void => {
    let app: INestApplication;

    beforeEach(
        async (): Promise<void> => {
            const testModule: TestingModule = await Test.createTestingModule({
                imports: [GistsModule]
            }).compile();

            app = testModule.createNestApplication();
            await app.init();
        }
    );

    describe('GET /', (): void => {
        const sendRequest = async (ownerUsername: string, gistId: string): Promise<request.Response> => {
            return await buildGetRequest(app, '/gists').query({ ownerUsername, gistId });
        };

        it('should return 401 if no access token is passed', async (): Promise<void> => {
            const response = await buildUnauthorizedGetRequest(app, '/gists');

            expect(response.status).toBe(401);
        });

        it('should return gist if name of existing gist and username of existing owner is passed', async (): Promise<
            void
        > => {
            const ownerUsername = 'staltz';
            const gistId = '868e7e9bc2a7b8c1f754';
            const response = await sendRequest(ownerUsername, gistId);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('gistId', gistId);
            expect(response.body).toHaveProperty('ownerUsername', ownerUsername);
        });

        it('should return 404 if name of non-existing gist is passed', async (): Promise<void> => {
            const randomId = uuid();
            const response = await sendRequest(randomId, Buffer.from(randomId).toString('base64'));

            expect(response.status).toBe(404);
        });

        it('should return 400 if required query parameters is not passed', async (): Promise<void> => {
            const response = await sendRequest('torvalds', ''); // missing 'gistName' query parameter

            expect(response.status).toBe(400);
        });

        it('should return 400 if gistId query parameter is not base64', async (): Promise<void> => {
            const response = await sendRequest('staltz', 'introrx.md');

            expect(response.status).toBe(400);
        });
    });

    afterAll(
        async (): Promise<void> => {
            await app.close();
        }
    );
});
