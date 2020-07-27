import {
    Injectable,
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import { UserEntity } from '../../app/user/entity/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        if (!request.headers.authorization) {
            return false;
        }
        request.user = await this.validateToken(request.headers.authorization);

        const user = await this.userRepository.findOne({
            where: { loginId: request.user.id },
            relations: ['roleId'],
        });

        if (user.isActive) {
            request.user.user = user;
            request.user.role = user.roleId.role;
        }

        return true;
    }

    async validateToken(auth: string) {
        if (auth.split(' ')[0] !== 'Bearer') {
            throw new HttpException('Invalid Token', HttpStatus.FORBIDDEN);
        }
        const token = auth.split(' ')[1];
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            return decoded;
        } catch (err) {
            const message = 'Token error:' + (err.messgae || err.name);
            throw new HttpException(message, HttpStatus.FORBIDDEN);
        }
    }
}
