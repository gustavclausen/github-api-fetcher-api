import { FetcherService } from './fetcher.service';
import { Test } from '@nestjs/testing';
import { ConfigService } from '../config/config.service';
import { Request } from 'jest-express/lib/request';
import { Request as ExpressRequest } from 'express';
import { RequestError, ResponseErrorType } from 'github-api-fetcher';
import {
    UnauthorizedException,
    ForbiddenException,
    ServiceUnavailableException,
    InternalServerErrorException
} from '@nestjs/common';

describe('FetcherService', (): void => {
    let service: FetcherService;

    beforeAll(
        async (): Promise<void> => {
            const module = await Test.createTestingModule({
                providers: [
                    FetcherService,
                    {
                        provide: ConfigService,
                        useValue: { getValue: (): string => 'dummy-value' }
                    }
                ]
            }).compile();

            service = module.get<FetcherService>(FetcherService);
        }
    );

    it('should be defined', (): void => {
        expect(service).toBeDefined();
    });

    describe('fetch', (): void => {
        const requestHeaderToken = 'header-token';

        // Create default request, and call 'fetch' method with that request and fetch call (taken as argument)
        const fetch = async <T>(apiFetchCall?: Promise<T>): Promise<T> => {
            const request = new Request('/', {
                headers: {
                    'github-access-token': requestHeaderToken
                }
            });

            return await service.fetch((request as unknown) as ExpressRequest, apiFetchCall);
        };

        it('returns resolved value of fetch call', async (): Promise<void> => {
            const resolvedValue = 'returnedValue';
            const fetchCall = new Promise<string>((resolve): void => resolve(resolvedValue));

            const result = await fetch(fetchCall);

            expect(result).toBe(resolvedValue);
        });

        it('sets access token from request header in fetcher', async (): Promise<void> => {
            const accessTokenSetter = jest.spyOn(service.fetcher, 'apiAccessToken', 'set');

            await fetch(new Promise((resolve): void => resolve('dummyReturnValue')));

            expect(accessTokenSetter).toHaveBeenCalledWith(requestHeaderToken);
        });

        describe('request errors from fetcher', (): void => {
            it('should throw UnauthorizedException upon BAD_CREDENTIALS response', async (): Promise<void> => {
                const requestError = new RequestError(ResponseErrorType.BAD_CREDENTIALS, 'Bad credentials');

                await expect(fetch(new Promise((_resolve, reject): void => reject(requestError)))).rejects.toThrowError(
                    UnauthorizedException
                );
            });

            it('should throw ForbiddenException upon INSUFFICIENT_SCOPES response', async (): Promise<void> => {
                const requestError = new RequestError(ResponseErrorType.INSUFFICIENT_SCOPES, 'Insufficient scopes');

                await expect(fetch(new Promise((_resolve, reject): void => reject(requestError)))).rejects.toThrowError(
                    ForbiddenException
                );
            });

            it('should throw ForbiddenException upon ACCESS_FORBIDDEN response', async (): Promise<void> => {
                const requestError = new RequestError(ResponseErrorType.ACCESS_FORBIDDEN, 'Rate limit hit');

                await expect(fetch(new Promise((_resolve, reject): void => reject(requestError)))).rejects.toThrowError(
                    ForbiddenException
                );
            });

            it('should throw ServiceUnavailableException upon GITHUB_SERVER_ERROR response', async (): Promise<
                void
            > => {
                const requestError = new RequestError(ResponseErrorType.GITHUB_SERVER_ERROR, 'GitHub API is down');

                await expect(fetch(new Promise((_resolve, reject): void => reject(requestError)))).rejects.toThrowError(
                    ServiceUnavailableException
                );
            });

            it('should throw InternalServerErrorException upon NOT_FOUND response', async (): Promise<void> => {
                const requestError = new RequestError(ResponseErrorType.NOT_FOUND, 'Internal server error');

                await expect(fetch(new Promise((_resolve, reject): void => reject(requestError)))).rejects.toThrowError(
                    InternalServerErrorException
                );
            });

            it('should throw InternalServerErrorException upon UNKNOWN response', async (): Promise<void> => {
                const requestError = new RequestError(ResponseErrorType.NOT_FOUND, 'Internal server error');

                await expect(fetch(new Promise((_resolve, reject): void => reject(requestError)))).rejects.toThrowError(
                    InternalServerErrorException
                );
            });
        });
    });
});
