import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';
import { request } from './constants';

@Injectable()
export class AccessTokenCheckMiddleware implements NestMiddleware {
  // TODO: Create test (unit and e2e)
  use(req: Request, _res: Response, next: () => void) {
    const accessToken = req.headers[request.ACCESS_TOKEN_HEADER];

    if (!accessToken) {
      throw new BadRequestException(`No GitHub API access token provided. Please assign it as a header called '${request.ACCESS_TOKEN_HEADER}'`);
    }

    next();
  }
}
