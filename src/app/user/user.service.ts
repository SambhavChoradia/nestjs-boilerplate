import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { Logger } from '../../core/logger/logger.service';
import { AuthEntity } from '../auth/entity/auth.entity';
import { UserEntity } from './entity/user.entity';
import { RoleEntity } from '../auth/entity/role.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(AuthEntity)
        private readonly authRepository: Repository<AuthEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(RoleEntity)
        private readonly roleRepository: Repository<RoleEntity>,
        private readonly logger: Logger,
    ) {}

    async create(data: UserDto, profilePic) {
        const { username, password, firstname, lastname, phone, roleId } = data;

        this.logger.debug(
            'request body for user creation: ' + JSON.stringify(data),
        );

        const checkLoginDetails = await this.authRepository.findOne({
            where: { username: username },
        });
        if (checkLoginDetails) {
            this.logger.error('User already exist.');
            throw new HttpException(
                'User already exist.',
                HttpStatus.CONFLICT,
            );
        }

        const checkUserDetails = await this.userRepository.findOne({
            where: { phone: phone },
        });
        if (checkUserDetails) {
            this.logger.error('User with phone number already exist.');
            throw new HttpException(
                'User with phone number already exist.',
                HttpStatus.CONFLICT,
            );
        }

        const role = await this.roleRepository.findOne({
            where: { ruid: roleId },
        });
        if (!role) {
            this.logger.error(`Role with ID ${roleId} not found.`);
            throw new HttpException(
                'Role not found.',
                HttpStatus.BAD_REQUEST,
            );
        }

        await this.userRepository.manager.transaction(
            async transactionalEntityManager => {
                const loginData = { username, password };

                const createLogin = await this.authRepository.create(
                    loginData,
                );

                const saveLogin = await transactionalEntityManager.save(
                    createLogin,
                );

                this.logger.debug(
                    'Save Login Info' + JSON.stringify(saveLogin),
                );

                if (!saveLogin) {
                    throw new HttpException(
                        'Issue creating user',
                        HttpStatus.BAD_REQUEST,
                    );
                }

                const userData = {
                    firstname,
                    lastname,
                    phone,
                    profilePic: profilePic ? profilePic.path : null,
                    loginId: saveLogin,
                    roleId: role,
                };
                const createUser = await this.userRepository.create(
                    userData,
                );

                const saveUser = await transactionalEntityManager.save(
                    createUser,
                );
                this.logger.debug('Save User: ' + JSON.stringify(saveUser));

                if (!saveUser) {
                    throw new HttpException(
                        'Error while registrating user.',
                        HttpStatus.BAD_REQUEST,
                    );
                }
            },
        );
        return {
            statusCode: HttpStatus.CREATED,
            message: 'User registered successfully.',
        };
    }
}
