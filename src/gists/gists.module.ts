import { Module } from '@nestjs/common';
import { GistsService } from './gists.service';
import { GistsController } from './gists.controller';

@Module({
    providers: [GistsService],
    controllers: [GistsController]
})
export class GistsModule {}
