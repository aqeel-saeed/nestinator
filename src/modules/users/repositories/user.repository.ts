import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { BaseRepository } from 'src/base/base.repository';
import { FindOptionsWhere, Repository } from 'typeorm';
import { FilteringService } from '../../../shared/utils/data-filtering/filtering.service';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    filteringService: FilteringService<User>,
  ) {
    super(userRepository, filteringService);
  }

  // Add user-specific methods here
  async getByEmail(email: string): Promise<User> {
    const user = await this.findOne({ email } as FindOptionsWhere<User>);
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }
}
