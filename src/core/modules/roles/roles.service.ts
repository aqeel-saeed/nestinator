import { Injectable } from '@nestjs/common';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleRepository } from './repositories/role.repository';
import { BaseService } from 'src/base/base.service';

@Injectable()
export class RolesService extends BaseService<Role> {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: RoleRepository,
  ) {
    super(roleRepository);
  }
}
