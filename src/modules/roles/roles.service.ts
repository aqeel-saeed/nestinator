import { Injectable } from '@nestjs/common';
import { Role } from './entities/role.entity';
import { RoleRepository } from './repositories/role.repository';
import { BaseService } from 'src/base/base.service';

@Injectable()
export class RolesService extends BaseService<Role> {
  constructor(private readonly roleRepository: RoleRepository) {
    super(roleRepository);
  }
}
