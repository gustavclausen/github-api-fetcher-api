import { AccessTokenCheckMiddleware } from './access-token-check.middleware';

describe('AccessTokenCheckMiddleware', () => {
  it('should be defined', () => {
    expect(new AccessTokenCheckMiddleware()).toBeDefined();
  });
});
