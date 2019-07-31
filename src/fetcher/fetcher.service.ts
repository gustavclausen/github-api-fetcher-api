import {
    Injectable,
    UnauthorizedException,
    ForbiddenException,
    ServiceUnavailableException,
    InternalServerErrorException
} from '@nestjs/common';
import { APIFetcher, RequestError, ResponseErrorType } from 'github-api-fetcher';
import { ConfigService } from '../config/config.service';
import { env, request } from '../constants';
import { Request } from 'express';

@Injectable()
export class FetcherService {
    readonly fetcher: APIFetcher;

    constructor(config: ConfigService) {
        this.fetcher = new APIFetcher(config.getValue(env.GITHUB_API_ACCESS_TOKEN) as string);
    }

    /**
     * Retrieves GitHub API access token from header in request, and executes fetch request
     * (taken as argument) with that token.
     *
     * @param req Incoming API request
     * @param apiFetchCall Call to API fetcher
     * @returns Resolved value of call to API fetcher
     *
     * @throws {UnauthorizedException} Upon receiving bad credentials
     * @throws {ForbiddenException} Upon hitting rate limit/abuse triggering, or token having insufficient scopes to perform call
     * @throws {ServiceUnavailableException} When GitHub API server is unavailable
     * @throws {InternalServerErrorException} When unknown error is thrown
     */
    async fetch<T>(req: Request, apiFetchCall: Promise<T>): Promise<T> {
        const currentAccessToken = this.fetcher.apiAccessToken;

        try {
            this.fetcher.apiAccessToken = req.headers[request.ACCESS_TOKEN_HEADER] as string; // Set access token from request header in fetcher

            return await apiFetchCall;
        } catch (error) {
            const requestError = error as RequestError;
            const credentialsErrorMessage = `${requestError.message}. Provided credentials: ${
                this.fetcher.apiAccessToken
            }`;

            switch (requestError.type) {
                case ResponseErrorType.BAD_CREDENTIALS:
                    throw new UnauthorizedException(credentialsErrorMessage);
                case ResponseErrorType.INSUFFICIENT_SCOPES:
                case ResponseErrorType.ACCESS_FORBIDDEN:
                    throw new ForbiddenException(credentialsErrorMessage);
                case ResponseErrorType.GITHUB_SERVER_ERROR:
                    throw new ServiceUnavailableException('GitHub API server is unavailable.');
                case ResponseErrorType.NOT_FOUND:
                case ResponseErrorType.UNKNOWN:
                default:
                    throw new InternalServerErrorException(`Internal server failure. ${requestError.message}`);
            }
        } finally {
            this.fetcher.apiAccessToken = currentAccessToken; // Reset access token in client
        }
    }
}
