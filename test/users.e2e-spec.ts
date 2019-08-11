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

        describe('GET /repositories', (): void => {
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

        describe('GET /organizationMemberships', (): void => {
            it('should return 401 if no access token is passed', async (): Promise<void> => {
                const response = await buildUnauthorizedGetRequest(app, '/users/dummy-user/organizationMemberships');

                expect(response.status).toBe(401);
            });

            it('should return organizations if existing username is passed', async (): Promise<void> => {
                const response = await sendRequest('/users/gaearon/organizationMemberships');

                expect(response.status).toBe(200);
                expect(response.body.length).toBeGreaterThan(0);
            });

            it('should return 404 if non-existing username is passed', async (): Promise<void> => {
                const nonExistingUsername = uuid();
                const response = await sendRequest(`/users/${nonExistingUsername}/organizationMemberships`);

                expect(response.status).toBe(404);
            });
        });

        describe('GET /gists', (): void => {
            it('should return 401 if no access token is passed', async (): Promise<void> => {
                const response = await buildUnauthorizedGetRequest(app, '/users/dummy-user/gists');

                expect(response.status).toBe(401);
            });

            it('should return gists if existing username is passed', async (): Promise<void> => {
                const response = await sendRequest('/users/staltz/gists');

                expect(response.status).toBe(200);
                expect(response.body.length).toBeGreaterThan(0);
            });

            it('should return 404 if non-existing username is passed', async (): Promise<void> => {
                const nonExistingUsername = uuid();
                const response = await sendRequest(`/users/${nonExistingUsername}/gists`);

                expect(response.status).toBe(404);
            });
        });

        describe('GET /contributions', (): void => {
            describe('GET /commits/month', (): void => {
                const sendRequest = async (
                    username: string,
                    year: number | null,
                    month: string | null
                ): Promise<request.Response> => {
                    return await buildGetRequest(app, `/users/${username}/contributions/commits/month`).query({
                        year,
                        month
                    });
                };

                it('should return 401 if no access token is passed', async (): Promise<void> => {
                    const response = await buildUnauthorizedGetRequest(
                        app,
                        '/users/dummy-user/contributions/commits/month'
                    );

                    expect(response.status).toBe(401);
                });

                it('should return contributions if existing username is passed', async (): Promise<void> => {
                    const response = await sendRequest('torvalds', 2017, 'MAY');

                    expect(response.status).toBe(200);
                    expect(response.body).toBeDefined();
                });

                it('should return 404 if non-existing username is passed', async (): Promise<void> => {
                    const nonExistingUsername = uuid();
                    const response = await sendRequest(nonExistingUsername, 2019, 'JANUARY');

                    expect(response.status).toBe(404);
                });

                it('should return 400 if no year query parameter is passed', async (): Promise<void> => {
                    const response = await sendRequest('torvalds', null, 'JUNE'); // missing 'year' query parameter

                    expect(response.status).toBe(400);
                });

                it('should return 400 if invalid year query parameter is passed', async (): Promise<void> => {
                    const response = await sendRequest('torvalds', 1990, 'FEBRUARY'); // 'year' must be >= 2000

                    expect(response.status).toBe(400);
                });

                it('should return 400 if no month query parameter is passed', async (): Promise<void> => {
                    const response = await sendRequest('torvalds', 2019, null); // missing 'month' query parameter

                    expect(response.status).toBe(400);
                });

                it('should return 400 if invalid month query parameter is passed', async (): Promise<void> => {
                    const response = await sendRequest('torvalds', 2016, 'NON-EXISTING-MONTH'); // invalid 'month' query parameter

                    expect(response.status).toBe(400);
                });
            });

            describe('GET /commits/year', (): void => {
                const sendRequest = async (username: string, year: number | null): Promise<request.Response> => {
                    return await buildGetRequest(app, `/users/${username}/contributions/commits/year`).query({
                        year
                    });
                };

                it('should return 401 if no access token is passed', async (): Promise<void> => {
                    const response = await buildUnauthorizedGetRequest(
                        app,
                        '/users/dummy-user/contributions/commits/year'
                    );

                    expect(response.status).toBe(401);
                });

                it('should return contributions if existing username is passed', async (): Promise<void> => {
                    const response = await sendRequest('torvalds', 2017);

                    expect(response.status).toBe(200);
                    expect(response.body).toBeDefined();
                });

                it('should return 404 if non-existing username is passed', async (): Promise<void> => {
                    const nonExistingUsername = uuid();
                    const response = await sendRequest(nonExistingUsername, 2019);

                    expect(response.status).toBe(404);
                });

                it('should return 400 if no year query parameter is passed', async (): Promise<void> => {
                    const response = await sendRequest('torvalds', null); // missing 'year' query parameter

                    expect(response.status).toBe(400);
                });

                it('should return 400 if invalid year query parameter is passed', async (): Promise<void> => {
                    const response = await sendRequest('torvalds', 1990); // 'year' must be >= 2000

                    expect(response.status).toBe(400);
                });
            });

            describe('GET /years', (): void => {
                const sendRequest = async (username: string): Promise<request.Response> => {
                    return await buildGetRequest(app, `/users/${username}/contributions/years`);
                };

                it('should return 401 if no access token is passed', async (): Promise<void> => {
                    const response = await buildUnauthorizedGetRequest(app, '/users/dummy-user/contributions/years');

                    expect(response.status).toBe(401);
                });

                it('should return years if existing username is passed', async (): Promise<void> => {
                    const response = await sendRequest('torvalds');

                    expect(response.status).toBe(200);
                    expect(response.body.length).toBeGreaterThan(0);
                });

                it('should return 404 if non-existing username is passed', async (): Promise<void> => {
                    const nonExistingUsername = uuid();
                    const response = await sendRequest(nonExistingUsername);

                    expect(response.status).toBe(404);
                });
            });
        });
    });

    afterAll(
        async (): Promise<void> => {
            await app.close();
        }
    );
});
