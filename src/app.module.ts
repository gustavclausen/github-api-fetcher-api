import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { RepositoriesModule } from './repositories/repositories.module';
import { GistsModule } from './gists/gists.module';

@Module({
    imports: [UsersModule, OrganizationsModule, RepositoriesModule, GistsModule]
})
export class AppModule {}
