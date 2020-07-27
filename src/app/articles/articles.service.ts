import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleEntity } from './entity/article.entity';
import { Logger } from '../../core/logger/logger.service';
import { ArticleDto } from './dto/article.dto';

@Injectable()
export class ArticlesService {
    constructor(
        @InjectRepository(ArticleEntity)
        private readonly articleRepository: Repository<ArticleEntity>,
        private readonly logger: Logger,
    ) {}

    async create(data: ArticleDto, user): Promise<{}> {
        const { title, description } = data;

        this.logger.debug(
            'request body for article creation: ' + JSON.stringify(data),
        );

        const articleData = {
            title: title,
            description: description,
            createdBy: user.user,
        };

        const createArticle = await this.articleRepository.create(articleData);
        const saveArticle = await this.articleRepository.save(createArticle);

        this.logger.debug('save Article: ' + JSON.stringify(saveArticle));
        if (!saveArticle) {
            this.logger.error('Issue creating Article');
            throw new HttpException(
                'Issue creating Article',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
        return {
            statusCode: HttpStatus.CREATED,
            message: 'Article created successfully',
        };
    }

    async update(data: ArticleDto, articleId: string): Promise<{}> {
        const { title, description } = data;

        this.logger.debug(
            'request body for article updation: ' + JSON.stringify(data),
        );
        const article = await this.articleRepository.findOne({
            where: { auid: articleId },
        });

        if (!article) {
            this.logger.error('Article not found');
            throw new HttpException(
                'Article not found',
                HttpStatus.BAD_REQUEST,
            );
        }

        const articleData = {
            title: title,
            description: description,
        };

        const updateArticle = await this.articleRepository.update(
            article.id,
            articleData,
        );
        this.logger.debug('update Article: ' + JSON.stringify(updateArticle));
        if (!updateArticle) {
            this.logger.error('Issue updating Article');
            throw new HttpException(
                'Issue updating Article',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
        return {
            statusCode: HttpStatus.OK,
            message: 'Article updated successfully',
        };
    }

    async delete(articleId: string): Promise<{}> {
        const article = await this.articleRepository.findOne({
            where: { auid: articleId },
        });

        this.logger.debug('Article data: ' + JSON.stringify(article));
        if (!article) {
            this.logger.error('Article not found');
            throw new HttpException(
                'Article not found',
                HttpStatus.BAD_REQUEST,
            );
        }

        const deleteArticle = await this.articleRepository.delete(article.id);

        this.logger.debug('delete Article: ' + JSON.stringify(deleteArticle));
        if (!deleteArticle) {
            this.logger.error('Issue deleting Article');
            throw new HttpException(
                'Issue deleting Article',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
        return {
            statusCode: HttpStatus.OK,
            message: 'Article deleted successfully',
        };
    }

    async show(): Promise<{}> {
        const article = await this.articleRepository
            .createQueryBuilder('a')
            .select('a.auid', 'articleId')
            .addSelect('a.title', 'title')
            .addSelect('a.description', 'description')
            .execute();

        if (article.length > 0) {
            return {
                statusCode: HttpStatus.OK,
                message: 'Article fetched successfully',
                data: article,
            };
        }
        throw new HttpException('No Content', HttpStatus.NO_CONTENT);
    }
}
