import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { OrganizationsModule } from './organizations/organizations.module';

@Module({
    imports: [UsersModule, OrganizationsModule]
})
export class AppModule {}
