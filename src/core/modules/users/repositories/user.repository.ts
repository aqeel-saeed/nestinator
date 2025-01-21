import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/base/base.repository';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository extends BaseRepository<User> {}
