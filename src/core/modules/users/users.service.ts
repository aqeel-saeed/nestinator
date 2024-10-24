import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EntityNotFoundException } from 'src/shared/exceptions/not-found.exception';
import { BaseService } from 'src/base/base.service';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UsersService extends BaseService<User> {
    constructor(
        @InjectRepository(User)
        private userRepository: UserRepository
    ) {
        super(userRepository);
    }

    async getByEmail(email: string) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (user) {
            return user;
        }
        throw new EntityNotFoundException('User');
    }

    async getUserPermissions(userId: number) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['roles', 'roles.permissions']
        });

        if (!user) {
            throw new EntityNotFoundException('User', userId);
        }

        const permissions = user.roles
            .flatMap((role) => role.permissions)
            .filter((permission, index, self) =>
                index === self.findIndex((p) => p.key === permission.key)
            );

        return permissions;
    }

    async getByIdWithPermissions(userId: number) {
        return this.userRepository.findOne({
            where: { id: userId },
            relations: ['roles', 'roles.permissions'],
        });
    }
}
