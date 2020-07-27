import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthEntity } from './entity/auth.entity';
import { Logger } from '../../core/logger/logger.service';
import { RoleEntity } from './entity/role.entity';
import { UserEntity } from '../user/entity/user.entity';

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '30d' },
        }),
        TypeOrmModule.forFeature([AuthEntity, RoleEntity, UserEntity]),
    ],
    controllers: [AuthController],
    providers: [AuthService, Logger],
})
export class AuthModule {}
