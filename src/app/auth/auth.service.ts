import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { AuthEntity } from './entity/auth.entity';
import { UserEntity } from '../user/entity/user.entity';
import { RoleEntity } from '../auth/entity/role.entity';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(AuthEntity)
        private readonly authRepository: Repository<AuthEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(RoleEntity)
        private readonly roleRepository: Repository<RoleEntity>,
        private readonly jwtService: JwtService,
        private readonly logger: Logger,
    ) {}

    async login(data: AuthDto): Promise<{}> {
        const { username, password } = data;

        const user = await this.authRepository.findOne({
            where: { username: username },
        });

        if (!user || !(await user.comparePassword(password))) {
            this.logger.error(
                'Invalid username/password' + JSON.stringify(user),
            );
            throw new HttpException(
                'Invalid username/password',
                HttpStatus.BAD_REQUEST,
            );
        }
        const { id } = user;
        const payload = { id };
        const accessToken = await this.jwtService.sign(payload);

        return {
            statusCode: HttpStatus.OK,
            message: 'Authorization success',
            token: accessToken,
        };
    }

    async getProfile(req): Promise<{}> {
        const condition = `u.id = ${req.user.id}`;

        const user = await this.userRepository
            .createQueryBuilder('u')
            .select('u.uuid', 'userId')
            .addSelect('u.firstname', 'firstname')
            .addSelect('u.lastname', 'lastname')
            .addSelect('u.phone', 'phone')
            .addSelect('u.profilePic', 'profilePic')
            .addSelect('r.ruid', 'roleId')
            .addSelect('r.role', 'role')
            .innerJoin(RoleEntity, 'r', 'r.id = u.roleId')
            .where(condition)
            .execute();

        if (user) {
            return {
                statusCode: HttpStatus.OK,
                message: 'User profile fetched successfully',
                data: user,
            };
        }
        this.logger.error('User not found');
        throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
}
