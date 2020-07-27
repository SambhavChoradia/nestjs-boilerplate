import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Logger } from './logger/logger.service';
import { AppModule } from '../app/app.module';
import { dbConfig } from './database/dbconfig';

@Module({
    imports: [TypeOrmModule.forRoot(dbConfig), AppModule],
    providers: [Logger],
})
export class CoreModule {}
