import { Controller, Get, Req, Param, NotFoundException } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { Request } from 'express';
import { OrganizationProfile } from 'github-api-fetcher';

@Controller('organizations')
export class OrganizationsController {
    private readonly organizationsService: OrganizationsService;

    constructor(organizationsService: OrganizationsService) {
        this.organizationsService = organizationsService;
    }

    @Get(':organizationName')
    async getOrganization(
        @Req() req: Request,
        @Param('organizationName') organizationName: string
    ): Promise<OrganizationProfile> {
        const profile = await this.organizationsService.getOrganization(req, organizationName);

        if (!profile) throw new NotFoundException(`GitHub organization '${organizationName} not found'`);

        return profile;
    }
}
