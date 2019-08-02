import { AccessTokenCheckMiddleware } from './access-token-check.middleware';
import { Request as ExpressRequest, Response } from 'express';
import { BadRequestException, NestMiddleware } from '@nestjs/common';
import { Request } from 'jest-express/lib/request';

describe('AccessTokenCheckMiddleware', (): void => {
    let middleware: NestMiddleware;
    const dummyResponse: Response = ({} as unknown) as Response;

    beforeEach(
        (): void => {
            middleware = new AccessTokenCheckMiddleware();
        }
    );

    it('should be defined', (): void => {
        expect(middleware).toBeDefined();
    });

    it('should throw BadRequestException when request does not contain access token header', (): void => {
        const request = ({} as unknown) as ExpressRequest;

        expect((): void => middleware.use(request, dummyResponse, null)).toThrowError(BadRequestException);
    });

    it('should call next function when request contains valid access token header', (): void => {
        const request = (new Request('/', {
            headers: {
                'github-access-token': 'secret-access-token'
            }
        }) as unknown) as ExpressRequest;
        const nextFunction = jest.fn();

        middleware.use(request, dummyResponse, nextFunction);

        expect(nextFunction).toHaveBeenCalled();
    });
});
