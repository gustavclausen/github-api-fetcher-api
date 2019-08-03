import { Injectable } from '@nestjs/common';
import { FetcherService } from '../fetcher/fetcher.service';
import { Request } from 'express';
import { OrganizationProfile } from 'github-api-fetcher';

@Injectable()
export class OrganizationsService {
    private readonly fetcherService: FetcherService;

    constructor(fetcherService: FetcherService) {
        this.fetcherService = fetcherService;
    }

    async getOrganization(req: Request, organizationName: string): Promise<OrganizationProfile> {
        return await this.fetcherService.fetch(
            req,
            this.fetcherService.fetcher.organization.getProfile(organizationName)
        );
    }
}
