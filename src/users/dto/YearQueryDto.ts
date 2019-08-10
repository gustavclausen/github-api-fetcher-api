import { IsNumber, IsNotEmpty, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class YearQueryDto {
    @IsNotEmpty()
    @IsNumber()
    @Min(2000)
    @Transform((value): number => Number(value))
    year: number;
}
