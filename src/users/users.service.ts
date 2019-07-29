import { Injectable } from '@nestjs/common';
import { UserProfile } from 'github-api-fetcher/dist/models';
import { FetcherService } from '../fetcher/fetcher.service';
import { Request } from 'express';

@Injectable()
export class UsersService {
  constructor(private readonly fetcherService: FetcherService) {}

  async getUser(req: Request, gitHubUsername: string): Promise<UserProfile | null> {
    return await this.fetcherService.fetch(req, () => this.fetcherService.fetcher.user.getProfile(gitHubUsername));
  }
}
