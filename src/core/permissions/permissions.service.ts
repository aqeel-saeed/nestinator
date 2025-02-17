import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { BaseService } from 'src/base/base.service';
import { PermissionRepository } from './repositories/permission.repository';

@Injectable()
export class PermissionsService extends BaseService<Permission> {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: PermissionRepository,
  ) {
    super(permissionRepository);
  }
}
