import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/base/base.repository';
import { Permission } from '../entities/permission.entity';

@Injectable()
export class PermissionRepository extends BaseRepository<Permission> {}
