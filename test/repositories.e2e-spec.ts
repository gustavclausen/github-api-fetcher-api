import request from 'supertest';
import uuid from 'uuid';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '../src/config/config.service';
import { env, request as constantsRequest } from '../src/constants';
import { RepositoriesModule } from '../src/repositories/repositories.module';

describe('RepositoriesController (e2e)', (): void => {
    let app: INestApplication;
    let validAccessToken: string;

    beforeEach(
        async (): Promise<void> => {
            const testModule: TestingModule = await Test.createTestingModule({
                imports: [RepositoriesModule]
            }).compile();

            app = testModule.createNestApplication();
            await app.init();

            const configService = testModule.get<ConfigService>(ConfigService);
            validAccessToken = configService.getValue(env.GITHUB_API_ACCESS_TOKEN) as string;
        }
    );

    describe('GET /', (): void => {
        const sendValidRequest = async (ownerName: string, repositoryName: string): Promise<request.Response> => {
            return await request(app.getHttpServer())
                .get(`/repositories`)
                .query({ ownerName, repositoryName })
                .set(constantsRequest.ACCESS_TOKEN_HEADER, validAccessToken);
        };

        it('should return 401 if no access token is passed', async (): Promise<void> => {
            const response = await request(app.getHttpServer())
                .get(`/repositories`)
                .set(constantsRequest.ACCESS_TOKEN_HEADER, '');

            expect(response.status).toBe(401);
        });

        it('should return repository if name of existing repository and name of existing owner is passed', async (): Promise<
            void
        > => {
            const ownerName = 'facebook';
            const repositoryName = 'react';
            const response = await sendValidRequest(ownerName, repositoryName);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('name', repositoryName);
            expect(response.body).toHaveProperty('ownerName', ownerName);
        });

        it('should return 404 if name of non-existing repository is passed', async (): Promise<void> => {
            const randomId = uuid();
            const response = await sendValidRequest(randomId, randomId);

            expect(response.status).toBe(404);
        });

        it('should return 400 if required query parameters is not passed', async (): Promise<void> => {
            const response = await request(app.getHttpServer())
                .get(`/repositories`)
                .query({ ownerName: 'facebook' }) // missing 'repositoryName' query parameter
                .set(constantsRequest.ACCESS_TOKEN_HEADER, validAccessToken);

            expect(response.status).toBe(400);
        });
    });

    afterAll(
        async (): Promise<void> => {
            await app.close();
        }
    );
});
