import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { In, Repository } from 'typeorm';
import { EntityNotFoundException } from 'src/shared/exceptions/not-found.exception';

@Injectable()
export class PermissionsService {
    constructor(
        @InjectRepository(Permission)
        private readonly permissionRepository: Repository<Permission>,
    ) {}

    async getAll() {
        return await this.permissionRepository.find();
    }
    
    async getByKey(key: string) {
        const permission = await this.permissionRepository.findOne({ where: { key } });
        if (!permission) {
            throw new EntityNotFoundException('Permission');
        }
        return permission;
    }

    async getById(id: number) {
        const permission = await this.permissionRepository.findOne({ where: { id } });
        if (!permission) {
            throw new EntityNotFoundException('Permission', id);
        }
        return permission;
    }

    async getByIds(ids: number[]) {
        const permissions = await this.permissionRepository.findBy({ id: In(ids) });
        if (permissions) {
            return permissions;
        }
        throw new EntityNotFoundException('Permission');
    }
}
