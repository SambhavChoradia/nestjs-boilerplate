import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
    @ApiProperty({
        example: 'initbit@ib.in',
        description: 'username',
    })
    @IsNotEmpty()
    @IsEmail()
    username: string;

    @ApiProperty({
        example: 'password',
        description: 'password',
    })
    @IsNotEmpty()
    @IsString()
    password: string;
}
