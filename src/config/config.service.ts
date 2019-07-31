import * as fs from 'fs';
import * as dotenv from 'dotenv';
import * as Joi from '@hapi/joi';

export interface EnvConfig {
    [key: string]: string | number;
}

export class ConfigService {
    private readonly envConfig: EnvConfig;

    constructor(envFilePath: string) {
        const envData = dotenv.parse(this.loadFile(envFilePath));
        this.envConfig = this.validateInput(envData);
    }

    private loadFile(filePath: string): Buffer {
        try {
            return fs.readFileSync(filePath);
        } catch (err) {
            throw new Error(`No .env file found on path: ${filePath}`);
        }
    }

    private validateInput(envConfig: EnvConfig): EnvConfig {
        const envSchema: Joi.ObjectSchema = Joi.object({
            PORT: Joi.number().required(),
            GITHUB_API_ACCESS_TOKEN: Joi.string().required()
        });

        const { error, value: validatedEnvConfig } = Joi.validate(envConfig, envSchema);
        if (error) {
            throw new Error(`Configuration validation error: ${error.message}`);
        }

        return validatedEnvConfig;
    }

    getValue(key: string): string | number {
        return this.envConfig[key];
    }
}
