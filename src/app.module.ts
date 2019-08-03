import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { RepositoriesModule } from './repositories/repositories.module';

@Module({
    imports: [UsersModule, OrganizationsModule, RepositoriesModule]
})
export class AppModule {}
