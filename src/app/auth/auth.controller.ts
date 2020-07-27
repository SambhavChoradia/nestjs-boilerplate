import {
    Controller,
    HttpStatus,
    HttpCode,
    Post,
    Body,
    Get,
    Request,
    UseGuards,
} from '@nestjs/common';
import {
    ApiOperation,
    ApiResponse,
    ApiUnauthorizedResponse,
    ApiForbiddenResponse,
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiTags,
} from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '../../core/guard/auth.guard';
import { ValidationPipe } from '../../core/pipe/validation.pipe';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({ summary: 'User Login' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Authorization success',
    })
    @ApiForbiddenResponse({
        status: HttpStatus.FORBIDDEN,
        description: 'Forbidden',
    })
    @ApiBadRequestResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Bad Request',
    })
    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body(ValidationPipe) data: AuthDto) {
        return this.authService.login(data);
    }

    @ApiOperation({ summary: 'User Profile' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'User profile fetched successfully',
    })
    @ApiUnauthorizedResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Unauthorized',
    })
    @ApiForbiddenResponse({
        status: HttpStatus.FORBIDDEN,
        description: 'Forbidden',
    })
    @ApiBearerAuth()
    @Get('profile')
    @UseGuards(AuthGuard)
    getProfile(@Request() req) {
        return this.authService.getProfile(req.user);
    }
}
