import { Injectable } from '@nestjs/common';
import { FetcherService } from '../fetcher/fetcher.service';
import { Request } from 'express';
import {
    UserProfile,
    RepositoryProfileMinified,
    OrganizationProfileMinified,
    GistProfileMinified,
    MonthlyContributions,
    Month,
    MonthlyPullRequestContributions
} from 'github-api-fetcher';

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

    async getUsersGists(req: Request, username: string): Promise<GistProfileMinified[] | null> {
        return await this.fetcherService.fetch(req, this.fetcherService.fetcher.user.getPublicGists(username));
    }

    async getUsersCommitContributionsInMonth(
        req: Request,
        username: string,
        year: number,
        month: Month
    ): Promise<MonthlyContributions | null> {
        return await this.fetcherService.fetch(
            req,
            this.fetcherService.fetcher.user.getCommitContributionsInMonth(username, year, month)
        );
    }

    async getUsersCommitContributionsInYear(
        req: Request,
        username: string,
        year: number
    ): Promise<MonthlyContributions[] | null> {
        return await this.fetcherService.fetch(
            req,
            this.fetcherService.fetcher.user.getCommitContributionsInYear(username, year)
        );
    }

    async getUsersContributionYears(req: Request, username: string): Promise<number[] | null> {
        return await this.fetcherService.fetch(req, this.fetcherService.fetcher.user.getContributionYears(username));
    }

    async getUsersIssueContributionsInMonth(
        req: Request,
        username: string,
        year: number,
        month: Month
    ): Promise<MonthlyContributions | null> {
        return await this.fetcherService.fetch(
            req,
            this.fetcherService.fetcher.user.getIssueContributionsInMonth(username, year, month)
        );
    }

    async getUsersIssueContributionsInYear(
        req: Request,
        username: string,
        year: number
    ): Promise<MonthlyContributions[] | null> {
        return await this.fetcherService.fetch(
            req,
            this.fetcherService.fetcher.user.getIssueContributionsInYear(username, year)
        );
    }

    async getUsersPullRequestContributionsInMonth(
        req: Request,
        username: string,
        year: number,
        month: Month
    ): Promise<MonthlyPullRequestContributions | null> {
        return await this.fetcherService.fetch(
            req,
            this.fetcherService.fetcher.user.getPullRequestContributionsInMonth(username, year, month)
        );
    }

    async getUsersPullRequestContributionsInYear(
        req: Request,
        username: string,
        year: number
    ): Promise<MonthlyPullRequestContributions[] | null> {
        return await this.fetcherService.fetch(
            req,
            this.fetcherService.fetcher.user.getPullRequestContributionsInYear(username, year)
        );
    }
}
