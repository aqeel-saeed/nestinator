import { Injectable } from '@nestjs/common';
import { BaseSeeder } from './base-seeder.seeder';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../modules/users/entities/user.entity';

@Injectable()
export class AdminUserSeeder extends BaseSeeder<User> {
  constructor(
    @InjectRepository(User)
    repository: Repository<User>,
  ) {
    super(repository);
  }

  // Provide seed data
  async getSeedData(): Promise<User[]> {
    const hashedPassword = await bcrypt.hash('Admin123!', 10);

    const users: User[] = [
      {
        email: 'admin@admin.com',
        name: 'admin',
        password: hashedPassword,
      },
    ];

    return users;
  }
}
