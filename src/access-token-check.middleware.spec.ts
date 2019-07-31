import { AccessTokenCheckMiddleware } from './access-token-check.middleware';

describe('AccessTokenCheckMiddleware', (): void => {
    it('should be defined', (): void => {
        expect(new AccessTokenCheckMiddleware()).toBeDefined();
    });
});
