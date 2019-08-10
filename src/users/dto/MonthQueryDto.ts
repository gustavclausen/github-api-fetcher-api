import { IsEnum, IsNumber, IsNotEmpty, Min } from 'class-validator';
import { Month } from 'github-api-fetcher';
import { Transform } from 'class-transformer';

export class MonthQueryDto {
    @IsNotEmpty()
    @IsEnum(Month)
    @Transform((value: string): Month => Month[value])
    month: Month;

    @IsNotEmpty()
    @IsNumber()
    @Min(2000)
    @Transform((value): number => Number(value))
    year: number;
}
