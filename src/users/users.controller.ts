import { Controller, Get, Param, NotFoundException, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserProfile, RepositoryProfileMinified, OrganizationProfileMinified } from 'github-api-fetcher';
import { Request } from 'express';

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
}
