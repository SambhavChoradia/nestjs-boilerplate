import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ArticleDto {
    @ApiProperty({
        example: 'Article title',
        description: 'Article title',
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(150)
    title: string;

    @ApiProperty({
        example: 'Article description',
        description: 'Article description',
    })
    @IsNotEmpty()
    @IsString()
    description: string;
}
