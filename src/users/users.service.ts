import { Injectable } from '@nestjs/common';
import { UserProfile } from 'github-api-fetcher/dist/models';
import { FetcherService } from '../fetcher/fetcher.service';

@Injectable()
export class UsersService {
  constructor(private readonly fetcherService: FetcherService) {}

  async getUser(gitHubUsername: string): Promise<UserProfile | null> {
    return this.fetcherService.fetcher.user.getProfile(gitHubUsername);
  }
}
