import { Controller, Get, Param, NotFoundException, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserProfile } from 'github-api-fetcher/dist/models';
import { Request } from 'express';

@Controller('users')
export class UsersController {
    private readonly usersService: UsersService;

    constructor(usersService: UsersService) {
        this.usersService = usersService;
    }

    @Get(':gitHubUsername')
    async getUser(@Req() req: Request, @Param('gitHubUsername') gitHubUserName: string): Promise<UserProfile> {
        const profile = await this.usersService.getUser(req, gitHubUserName);

        if (!profile) throw new NotFoundException(`GitHub profile '${gitHubUserName}' not found`);

        return profile;
    }
}
