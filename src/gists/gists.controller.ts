import { Controller, Get, Req, Query, ValidationPipe, NotFoundException } from '@nestjs/common';
import { GistsService } from './gists.service';
import { GistQueryDto } from './dto/GistQueryDto';
import { GistProfile } from 'github-api-fetcher';
import { Request } from 'express';

@Controller('gists')
export class GistsController {
    private readonly gistsService: GistsService;

    constructor(gistsService: GistsService) {
        this.gistsService = gistsService;
    }

    @Get()
    async getGist(@Req() req: Request, @Query(ValidationPipe) query: GistQueryDto): Promise<GistProfile> {
        const profile = await this.gistsService.getGist(req, query.ownerUsername, query.gistName);

        if (!profile) throw new NotFoundException(`GitHub gist '${query.ownerUsername}/${query.gistName}' not found`);

        return profile;
    }
}
