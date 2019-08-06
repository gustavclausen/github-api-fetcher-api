import { Controller, Get, Param, NotFoundException, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserProfile, RepositoryProfileMinified } from 'github-api-fetcher/dist/models';
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
}
