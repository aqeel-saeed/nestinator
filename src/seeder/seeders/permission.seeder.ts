import { Injectable } from '@nestjs/common';
import { BaseSeeder } from './base-seeder.seeder';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from '../../core/permissions/entities/permission.entity';
import { permissions } from '../../core/permissions/permissions';

@Injectable()
export class PermissionSeeder extends BaseSeeder<Permission> {
  constructor(
    @InjectRepository(Permission)
    repository: Repository<Permission>,
  ) {
    super(repository);
  }

  // Provide seed data
  protected getSeedData(): Permission[] {
    return permissions;
  }
}
