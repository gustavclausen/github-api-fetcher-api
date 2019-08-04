import { IsNotEmpty } from 'class-validator';

export class GistQueryDto {
    @IsNotEmpty()
    ownerUsername: string;

    @IsNotEmpty()
    gistName: string;
}
