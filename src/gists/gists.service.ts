import { Injectable } from '@nestjs/common';
import { FetcherService } from '../fetcher/fetcher.service';
import { Request } from 'express';
import { GistProfile } from 'github-api-fetcher';

@Injectable()
export class GistsService {
    private readonly fetcherService: FetcherService;

    constructor(fetcherService: FetcherService) {
        this.fetcherService = fetcherService;
    }

    async getGist(req: Request, ownerUsername: string, gistName: string): Promise<GistProfile | null> {
        return await this.fetcherService.fetch(
            req,
            this.fetcherService.fetcher.gist.getProfile(ownerUsername, gistName)
        );
    }
}
