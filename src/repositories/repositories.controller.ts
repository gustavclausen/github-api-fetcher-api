import { Controller, Get, Query, ValidationPipe, Req, NotFoundException } from '@nestjs/common';
import { RepositoriesService } from './repositories.service';
import { RepositoryProfile } from 'github-api-fetcher';
import { RepositoryQueryDto } from './dto/RepositoryQueryDto';
import { Request } from 'express';

@Controller('repositories')
export class RepositoriesController {
    private readonly repositoriesService: RepositoriesService;

    constructor(repositoriesService: RepositoriesService) {
        this.repositoriesService = repositoriesService;
    }

    @Get()
    async getRepository(
        @Req() req: Request,
        @Query(ValidationPipe) query: RepositoryQueryDto
    ): Promise<RepositoryProfile> {
        const profile = await this.repositoriesService.getRepository(req, query.ownerName, query.repositoryName);

        if (!profile)
            throw new NotFoundException(`GitHub repository '${query.ownerName}/${query.repositoryName}' not found`);

        return profile;
    }
}
