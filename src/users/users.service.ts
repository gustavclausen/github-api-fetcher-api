import { Injectable } from '@nestjs/common';
import { UserProfile, RepositoryProfileMinified, OrganizationProfileMinified } from 'github-api-fetcher';
import { FetcherService } from '../fetcher/fetcher.service';
import { Request } from 'express';

@Injectable()
export class UsersService {
    private readonly fetcherService: FetcherService;

    constructor(fetcherService: FetcherService) {
        this.fetcherService = fetcherService;
    }

    async getUser(req: Request, username: string): Promise<UserProfile | null> {
        return await this.fetcherService.fetch(req, this.fetcherService.fetcher.user.getProfile(username));
    }

    async getUsersRepositories(req: Request, username: string): Promise<RepositoryProfileMinified[] | null> {
        return await this.fetcherService.fetch(
            req,
            this.fetcherService.fetcher.user.getPublicRepositoryOwnerships(username)
        );
    }

    async getUsersOrganizationMemberships(
        req: Request,
        username: string
    ): Promise<OrganizationProfileMinified[] | null> {
        return await this.fetcherService.fetch(
            req,
            this.fetcherService.fetcher.user.getOrganizationMemberships(username)
        );
    }
}
