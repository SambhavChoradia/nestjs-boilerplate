import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ArticlesModule } from './articles/articles.module';

@Module({
    imports: [AuthModule, UserModule, ArticlesModule],
})
export class AppModule {}
