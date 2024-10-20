import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { Repository } from 'typeorm';
import { permissionType } from 'src/shared/enums/permissions.enum';
import { EntityNotFoundException } from 'src/shared/exceptions/not-found.exception';

@Injectable()
export class PermissionsService {
    constructor(
        @InjectRepository(Permission)
        private readonly permissionRepository: Repository<Permission>,
    ) {}

    async findByKey(key: string) {
        const permission = await this.permissionRepository.findOne({ where: { key } });
        if (!permission) {
            throw new EntityNotFoundException('Permission');
        }
        return permission;
    }

    async findById(id: number) {
        const permission = await this.permissionRepository.findOne({ where: { id } });
        if (!permission) {
            throw new EntityNotFoundException('Permission', id);
        }
        return permission;
    }

    async findAll() {
        return await this.permissionRepository.find();
    }
}
