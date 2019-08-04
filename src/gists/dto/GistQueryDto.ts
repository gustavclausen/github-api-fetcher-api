import { IsNotEmpty, IsBase64 } from 'class-validator';

export class GistQueryDto {
    @IsNotEmpty()
    ownerUsername: string;

    @IsNotEmpty()
    @IsBase64()
    gistId: string;
}
