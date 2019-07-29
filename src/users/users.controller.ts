import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserProfile } from 'github-api-fetcher/dist/models';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':gitHubUsername')
  async getUser(@Param('gitHubUsername') gitHubUserName: string): Promise<UserProfile> {
    const profile = await this.usersService.getUser(gitHubUserName);

    if (!profile) throw new NotFoundException(`GitHub profile '${gitHubUserName}' not found`);

    return profile;
  }
}
