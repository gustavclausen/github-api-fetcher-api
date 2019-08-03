import { Injectable } from '@nestjs/common';
import { FetcherService } from '../fetcher/fetcher.service';
import { Request } from 'express';
import { RepositoryProfile } from 'github-api-fetcher';

@Injectable()
export class RepositoriesService {
    private readonly fetcherService: FetcherService;

    constructor(fetcherService: FetcherService) {
        this.fetcherService = fetcherService;
    }

    async getRepository(req: Request, ownerName: string, repositoryName: string): Promise<RepositoryProfile | null> {
        return await this.fetcherService.fetch(
            req,
            this.fetcherService.fetcher.repository.getProfile(ownerName, repositoryName)
        );
    }
}
