import _ from 'lodash';
import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';
import { request } from '../../constants';

@Injectable()
export class AccessTokenCheckMiddleware implements NestMiddleware {
    use(req: Request, _res: Response, next: () => void): void {
        const accessToken = _.get(req.headers, request.ACCESS_TOKEN_HEADER) as string;

        if (!accessToken) {
            throw new BadRequestException(
                `No GitHub API access token provided. Please assign it as a header called '${
                    request.ACCESS_TOKEN_HEADER
                }'`
            );
        }

        next();
    }
}
