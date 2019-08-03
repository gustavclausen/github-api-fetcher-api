import request from 'supertest';
import uuid from 'uuid';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '../src/config/config.service';
import { env, request as constantsRequest } from '../src/constants';
import { OrganizationsModule } from '../src/organizations/organizations.module';

describe('OrganizationsController (e2e)', (): void => {
    let app: INestApplication;
    let validAccessToken: string;

    beforeEach(
        async (): Promise<void> => {
            const testModule: TestingModule = await Test.createTestingModule({
                imports: [OrganizationsModule]
            }).compile();

            app = testModule.createNestApplication();
            await app.init();

            const configService = testModule.get<ConfigService>(ConfigService);
            validAccessToken = configService.getValue(env.GITHUB_API_ACCESS_TOKEN) as string;
        }
    );

    describe('GET /:organizationName', (): void => {
        const sendValidRequest = async (organizationName: string): Promise<request.Response> => {
            return await request(app.getHttpServer())
                .get(`/organizations/${organizationName}`)
                .set(constantsRequest.ACCESS_TOKEN_HEADER, validAccessToken);
        };

        it('should return 401 if no access token is passed', async (): Promise<void> => {
            const response = await request(app.getHttpServer())
                .get(`/organizations/dummy-organization`)
                .set(constantsRequest.ACCESS_TOKEN_HEADER, '');

            expect(response.status).toBe(401);
        });

        it('should return organization if name of existing organization is passed', async (): Promise<void> => {
            const organizationName = 'github';
            const response = await sendValidRequest(organizationName);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('name', organizationName);
        });

        it('should return 404 if name of non-existing organization is passed', async (): Promise<void> => {
            const nonExistingOrganizationName = uuid();
            const response = await sendValidRequest(nonExistingOrganizationName);

            expect(response.status).toBe(404);
        });
    });

    afterAll(
        async (): Promise<void> => {
            await app.close();
        }
    );
});
