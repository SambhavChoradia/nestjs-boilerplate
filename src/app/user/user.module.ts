import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Logger } from '../../core/logger/logger.service';
import { RoleEntity } from '../auth/entity/role.entity';
import { UserEntity } from './entity/user.entity';
import { AuthEntity } from '../auth/entity/auth.entity';

@Module({
    imports: [TypeOrmModule.forFeature([AuthEntity, RoleEntity, UserEntity])],
    controllers: [UserController],
    providers: [UserService, Logger],
})
export class UserModule {}
