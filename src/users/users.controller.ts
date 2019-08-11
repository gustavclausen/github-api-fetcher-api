import { Controller, Get, Param, NotFoundException, Req, Query, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'express';
import { MonthQueryDto } from './dto/MonthQueryDto';
import { YearQueryDto } from './dto/YearQueryDto';
import {
    UserProfile,
    RepositoryProfileMinified,
    OrganizationProfileMinified,
    GistProfileMinified,
    MonthlyContributions
} from 'github-api-fetcher';

@Controller('users/:username')
export class UsersController {
    private readonly usersService: UsersService;

    constructor(usersService: UsersService) {
        this.usersService = usersService;
    }

    @Get()
    async getUser(@Req() req: Request, @Param('username') username: string): Promise<UserProfile> {
        const profile = await this.usersService.getUser(req, username);

        if (!profile) throw new NotFoundException(`GitHub profile '${username}' not found`);

        return profile;
    }

    @Get('/repositories')
    async getUsersRepositories(
        @Req() req: Request,
        @Param('username') username: string
    ): Promise<RepositoryProfileMinified[]> {
        const repositories = await this.usersService.getUsersRepositories(req, username);

        if (!repositories) throw new NotFoundException(`GitHub profile '${username}' not found`);

        return repositories;
    }

    @Get('/organizationMemberships')
    async getUsersOrganizationMemberships(
        @Req() req: Request,
        @Param('username') username: string
    ): Promise<OrganizationProfileMinified[]> {
        const organizations = await this.usersService.getUsersOrganizationMemberships(req, username);

        if (!organizations) throw new NotFoundException(`GitHub profile '${username}' not found`);

        return organizations;
    }

    @Get('/gists')
    async getUsersGists(@Req() req: Request, @Param('username') username: string): Promise<GistProfileMinified[]> {
        const gists = await this.usersService.getUsersGists(req, username);

        if (!gists) throw new NotFoundException(`GitHub profile '${username}' not found`);

        return gists;
    }

    @Get('/contributions/commits/month')
    async getUsersCommitContributionsInMonth(
        @Req() req: Request,
        @Param('username') username: string,
        @Query(new ValidationPipe({ transform: true })) monthQuery: MonthQueryDto
    ): Promise<MonthlyContributions> {
        const contributions = await this.usersService.getUsersCommitContributionsInMonth(
            req,
            username,
            monthQuery.year,
            monthQuery.month
        );

        if (!contributions) throw new NotFoundException(`GitHub profile '${username}' not found`);

        return contributions;
    }

    @Get('/contributions/commits/year')
    async getUsersCommitContributionsInYear(
        @Req() req: Request,
        @Param('username') username: string,
        @Query(new ValidationPipe({ transform: true })) yearQuery: YearQueryDto
    ): Promise<MonthlyContributions[]> {
        const contributions = await this.usersService.getUsersCommitContributionsInYear(req, username, yearQuery.year);

        if (!contributions) throw new NotFoundException(`GitHub profile '${username}' not found`);

        return contributions;
    }

    @Get('/contributions/years')
    async getUsersContributionYears(@Req() req: Request, @Param('username') username: string): Promise<number[]> {
        const years = await this.usersService.getUsersContributionYears(req, username);

        if (!years) throw new NotFoundException(`GitHub profile '${username}' not found`);

        return years;
    }

    @Get('/contributions/issues/month')
    async getUsersIssueContributionsInMonth(
        @Req() req: Request,
        @Param('username') username: string,
        @Query(new ValidationPipe({ transform: true })) monthQuery: MonthQueryDto
    ): Promise<MonthlyContributions> {
        const contributions = await this.usersService.getUsersIssueContributionsInMonth(
            req,
            username,
            monthQuery.year,
            monthQuery.month
        );

        if (!contributions) throw new NotFoundException(`GitHub profile '${username}' not found`);

        return contributions;
    }
}
