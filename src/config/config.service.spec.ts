import { ConfigService, EnvConfig } from './config.service';

describe('ConfigService', (): void => {
    describe('constructor', (): void => {
        it('should load configuration from valid env file', (): void => {
            const service = new ConfigService(`${__dirname}/test-env-files/valid.env`);

            const expectedConfig: EnvConfig = {
                PORT: 1337,
                GITHUB_API_ACCESS_TOKEN: 'top-secret'
            };

            Object.keys(expectedConfig).forEach(
                (key): void => {
                    expect(service.getValue(key)).toBe(expectedConfig[key]);
                }
            );
        });

        it('should throw error when giving invalid env file', (): void => {
            expect((): ConfigService => new ConfigService(`${__dirname}/test-env-files/invalid.env`)).toThrow();
        });

        it('should throw error when giving filepath to non-existing file', (): void => {
            expect((): ConfigService => new ConfigService(`${__dirname}/test-env-files/non-existing.env`)).toThrow();
        });
    });
});
