import request from 'supertest';
import uuid from 'uuid';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { RepositoriesModule } from '../src/repositories/repositories.module';
import { buildGetRequest, buildUnauthorizedGetRequest } from './utils';

describe('RepositoriesController (e2e)', (): void => {
    let app: INestApplication;

    beforeEach(
        async (): Promise<void> => {
            const testModule: TestingModule = await Test.createTestingModule({
                imports: [RepositoriesModule]
            }).compile();

            app = testModule.createNestApplication();
            await app.init();
        }
    );

    describe('GET /', (): void => {
        const sendRequest = async (ownerName: string, repositoryName: string): Promise<request.Response> => {
            return await buildGetRequest(app, '/repositories').query({ ownerName, repositoryName });
        };

        it('should return 401 if no access token is passed', async (): Promise<void> => {
            const response = await buildUnauthorizedGetRequest(app, '/repositories');

            expect(response.status).toBe(401);
        });

        it('should return repository if name of existing repository and name of existing owner is passed', async (): Promise<
            void
        > => {
            const ownerName = 'facebook';
            const repositoryName = 'react';
            const response = await sendRequest(ownerName, repositoryName);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('name', repositoryName);
            expect(response.body).toHaveProperty('ownerName', ownerName);
        });

        it('should return 404 if name of non-existing repository is passed', async (): Promise<void> => {
            const randomId = uuid();
            const response = await sendRequest(randomId, randomId);

            expect(response.status).toBe(404);
        });

        it('should return 400 if required query parameters is not passed', async (): Promise<void> => {
            const response = await sendRequest('facebook', ''); // missing 'repositoryName' query parameter

            expect(response.status).toBe(400);
        });
    });

    afterAll(
        async (): Promise<void> => {
            await app.close();
        }
    );
});
