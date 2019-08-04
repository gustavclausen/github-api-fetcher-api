import { IsNotEmpty } from 'class-validator';

export class RepositoryQueryDto {
    @IsNotEmpty()
    ownerName: string;

    @IsNotEmpty()
    repositoryName: string;
}
