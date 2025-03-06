import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { EntityNotFoundException } from 'src/shared/exceptions/not-found.exception';
import { BaseService } from 'src/base/base.service';
import { UserRepository } from './repositories/user.repository';
import { FindOneOptions } from 'typeorm';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(private readonly userRepository: UserRepository) {
    super(userRepository);
  }

  async getByEmail(email: string) {
    return this.userRepository.getByEmail(email);
  }

  async getUserPermissions(userId: number) {
    const options: FindOneOptions<User> = {
      where: { id: userId },
      relations: ['roles', 'roles.permissions'],
    };

    const user = await this.userRepository.findOneRaw(options);

    if (!user) {
      throw new EntityNotFoundException('User', userId);
    }

    const permissions = user.roles
      .flatMap((role) => role.permissions)
      .filter(
        (permission, index, self) =>
          index === self.findIndex((p) => p.key === permission.key),
      );

    return permissions;
  }

  async getByIdWithPermissions(userId: number) {
    const options: FindOneOptions<User> = {
      where: { id: userId },
      relations: ['roles', 'roles.permissions'],
    };

    return this.userRepository.findOneRaw(options);
  }
}
