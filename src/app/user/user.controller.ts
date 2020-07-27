import {
    Controller,
    HttpStatus,
    UsePipes,
    ValidationPipe,
    HttpCode,
    Post,
    UseInterceptors,
    Body,
    UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
    ApiOperation,
    ApiResponse,
    ApiForbiddenResponse,
    ApiBadRequestResponse,
    ApiConsumes,
    ApiTags,
} from '@nestjs/swagger';
import { extname } from 'path';
import { UserDto } from './dto/user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import { diskStorage } from 'multer';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiOperation({ summary: 'User registration' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'User registered successfully',
    })
    @ApiForbiddenResponse({
        status: HttpStatus.FORBIDDEN,
        description: 'Forbidden',
    })
    @ApiBadRequestResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Bad Request',
    })
    @ApiConsumes('multipart/form-data')
    @UsePipes(ValidationPipe)
    @HttpCode(HttpStatus.OK)
    @Post()
    @UseInterceptors(
        FileInterceptor('profilePic', {
            storage: diskStorage({
                destination: function(req, profilePic, cb) {
                    const path = './attachments/';
                    fs.mkdirSync(path, { recursive: true });
                    return cb(null, path);
                },
                filename: (req, profilePic, cb) => {
                    const randomName = Array(32)
                        .fill(null)
                        .map(() => Math.round(Math.random() * 16).toString(16))
                        .join('');
                    return cb(
                        null,
                        `${randomName}${extname(profilePic.originalname)}`,
                    );
                },
            }),
        }),
    )
    create(@Body() data: UserDto, @UploadedFile() profilePic) {
        return this.userService.create(data, profilePic);
    }
}
