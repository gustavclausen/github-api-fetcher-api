import { Injectable, UnauthorizedException, ForbiddenException, ServiceUnavailableException, InternalServerErrorException } from '@nestjs/common';
import { APIFetcher, RequestError, ResponseErrorType } from 'github-api-fetcher';
import { ConfigService } from '../config/config.service';
import { env, request } from '../constants';
import { Request } from 'express';

@Injectable()
export class FetcherService {
  readonly fetcher: APIFetcher;

  constructor(config: ConfigService) {
    this.fetcher = new APIFetcher(config.getValue(env.GITHUB_API_ACCESS_TOKEN));
  }

  /**
   * TODO: Comment
   * TODO: Unit test
   * @param req 
   * @param apiRequest 
   */
  async fetch<T>(req: Request, apiRequest: (...args: any[]) => T): Promise<T> {
    const defaultAccessToken = this.fetcher.apiAccessToken;
    
    try {
      this.fetcher.apiAccessToken = req.headers[request.ACCESS_TOKEN_HEADER] as string; // Set access token from request header in client
      
      return await apiRequest();
    } catch (error) {
      const requestError = error as RequestError;
      const credentialsErrorMessage = `${requestError.message}. Provided credentials: ${this.fetcher.apiAccessToken}`;

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
          throw new InternalServerErrorException(`Internal server failure. ${requestError.message}`);
      }

    } finally {
      this.fetcher.apiAccessToken = defaultAccessToken; // Reset access token in client
    }
  }
}
