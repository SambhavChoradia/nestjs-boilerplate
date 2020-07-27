import {
    IsNotEmpty,
    IsNumberString,
    IsString,
    IsUUID,
    IsEmail,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
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

    @ApiProperty({
        example: 'raunak',
        description: 'firstname',
    })
    @IsNotEmpty()
    @IsString()
    firstname: string;

    @ApiProperty({
        example: 'kuamr',
        description: 'lastname',
    })
    @IsNotEmpty()
    @IsString()
    lastname: string;

    @ApiProperty({
        example: '9876575734',
        description: 'phone',
    })
    @IsNotEmpty()
    @IsNumberString()
    phone: string;

    @ApiProperty({
        example: 'beb253d8-a606-473c-b683-2738caebfc91',
        description: 'roleId',
    })
    @IsNotEmpty()
    @IsUUID()
    roleId: string;

    @ApiProperty({
        type: String,
        format: 'binary',
        required: false,
    })
    profilePic: any;
}
