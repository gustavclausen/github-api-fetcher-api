import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getUser(gitHubUsername: string): string {
    return gitHubUsername;
  }
}
