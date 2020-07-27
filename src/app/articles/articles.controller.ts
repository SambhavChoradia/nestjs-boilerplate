import {
    Controller,
    HttpStatus,
    Post,
    Body,
    ValidationPipe,
    Put,
    Param,
    Delete,
    Request,
    Get,
} from '@nestjs/common';
import {
    ApiOperation,
    ApiResponse,
    ApiNotFoundResponse,
    ApiNoContentResponse,
    ApiTags,
} from '@nestjs/swagger';
import { Auth } from '../../core/decorators/auth.decorator';
import { ArticlesService } from './articles.service';
import { Roles } from '../../core/decorators/role.decorator';
import { ArticleDto } from './dto/article.dto';

@ApiTags('Articles')
@Controller('articles')
export class ArticlesController {
    constructor(private readonly articlesService: ArticlesService) {}

    @ApiOperation({ summary: 'Create Article' })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Article Created Successfully',
    })
    @Post()
    @Auth()
    @Roles('Admin')
    create(@Body(ValidationPipe) data: ArticleDto, @Request() req) {
        return this.articlesService.create(data, req.user);
    }

    @ApiOperation({ summary: 'Update Article' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Article Updated Successfully',
    })
    @ApiNotFoundResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Article Not Found',
    })
    @Put(':articleId')
    @Auth()
    @Roles('Admin')
    update(
        @Body(ValidationPipe) data: ArticleDto,
        @Param('articleId') articleId: string,
    ) {
        return this.articlesService.update(data, articleId);
    }

    @ApiOperation({ summary: 'Delete Article' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Article deleted Successfully',
    })
    @ApiNotFoundResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Article Not Found',
    })
    @Delete(':articleId')
    @Auth()
    @Roles('Admin')
    delete(@Param('articleId') articleId: string) {
        return this.articlesService.delete(articleId);
    }

    @ApiOperation({ summary: 'Show all Article' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Article Fetched Successfully',
    })
    @ApiNoContentResponse({
        status: HttpStatus.NO_CONTENT,
        description: 'No Content Found',
    })
    @Get()
    @Auth()
    @Roles('Admin', 'User')
    showall() {
        return this.articlesService.show();
    }
}
