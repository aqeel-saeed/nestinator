import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/base/base.repository';
import { Role } from '../entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilteringService } from '../../../shared/utils/data-filtering/filtering.service';

@Injectable()
export class RoleRepository extends BaseRepository<Role> {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    filteringService: FilteringService<Role>,
  ) {
    super(roleRepository, filteringService);
  }
}
