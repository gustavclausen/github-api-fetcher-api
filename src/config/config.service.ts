import * as fs from 'fs';
import * as dotenv from 'dotenv';
import * as Joi from '@hapi/joi';

export interface EnvConfig {
    [key: string]: string;
}

// TODO: Create unit test
export class ConfigService {
    private readonly envConfig: EnvConfig;

    constructor() {
        this.envConfig = this.validateInput(this.parseEnvConfig());
    }

    private parseEnvConfig(): EnvConfig {
        return dotenv.parse(fs.readFileSync(`${process.env.NODE_ENV}.env`));
    }

    private validateInput(envConfig: EnvConfig): EnvConfig {
        const envSchema: Joi.ObjectSchema = Joi.object({
            NODE_ENV: Joi.string()
                .valid(['development', 'production', 'test'])
                .default('development'),
            PORT: Joi.number().default(8080),
            GITHUB_API_ACCESS_TOKEN: Joi.string().required()
        });

        const { error, value: validatedEnvConfig } = Joi.validate(envConfig, envSchema);
        if (error) {
            throw new Error(`Configuration validation error: ${error.message}`);
        }

        return validatedEnvConfig;
    }

    getValue(key: string): string {
        return this.envConfig[key];
    }
}
