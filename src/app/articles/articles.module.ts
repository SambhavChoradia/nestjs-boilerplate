import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { Logger } from '../../core/logger/logger.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entity/user.entity';
import { ArticleEntity } from './entity/article.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, ArticleEntity])],
    controllers: [ArticlesController],
    providers: [ArticlesService, Logger],
})
export class ArticlesModule {}
