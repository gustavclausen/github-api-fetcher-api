import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '../src/config/config.service';
import { env, request as constantsRequest } from '../src/constants';

const configService = new ConfigService('test.env');
const accessToken = configService.getValue(env.GITHUB_API_ACCESS_TOKEN) as string;

export const buildGetRequest = (app: INestApplication, resourcePath: string): request.Request => {
    return request(app.getHttpServer())
        .get(resourcePath)
        .set(constantsRequest.ACCESS_TOKEN_HEADER, accessToken);
};

export const buildUnauthorizedGetRequest = (app: INestApplication, resourcePath: string): request.Request => {
    return request(app.getHttpServer())
        .get(resourcePath)
        .set(constantsRequest.ACCESS_TOKEN_HEADER, '');
};
