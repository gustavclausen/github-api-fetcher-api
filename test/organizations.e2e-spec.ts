import request from 'supertest';
import uuid from 'uuid';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationsModule } from '../src/organizations/organizations.module';
import { buildGetRequest, buildUnauthorizedGetRequest } from './utils';

describe('OrganizationsController (e2e)', (): void => {
    let app: INestApplication;

    beforeEach(
        async (): Promise<void> => {
            const testModule: TestingModule = await Test.createTestingModule({
                imports: [OrganizationsModule]
            }).compile();

            app = testModule.createNestApplication();
            await app.init();
        }
    );

    describe('GET /:organizationName', (): void => {
        const sendValidRequest = async (organizationName: string): Promise<request.Response> => {
            return await buildGetRequest(app, `/organizations/${organizationName}`);
        };

        it('should return 401 if no access token is passed', async (): Promise<void> => {
            const response = await buildUnauthorizedGetRequest(app, '/organizations/dummy-organization');

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
