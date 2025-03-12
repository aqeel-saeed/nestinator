import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/base/base.repository';
import { Permission } from '../entities/permission.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilteringService } from '../../../shared/utils/data-filtering/filtering.service';

@Injectable()
export class PermissionRepository extends BaseRepository<Permission> {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
    filteringService: FilteringService<Permission>,
  ) {
    super(permissionRepository, filteringService);
  }
}
