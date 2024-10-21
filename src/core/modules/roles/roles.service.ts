import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { In, Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundException } from 'src/shared/exceptions/not-found.exception';
import { PermissionsService } from '../permissions/permissions.service';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
    private readonly permissionsService: PermissionsService,
  ) {}

  async getAll() {
    return this.rolesRepository.find();
  }

  async getById(id: number) {
    const role = this.rolesRepository.findOne({
      where: { id },
      relations: ['permissions']
    });
    if (role) {
      return role;
    }
    throw new EntityNotFoundException('Role', id);
  }
  
  async getByIds(ids: number[]) {
    const roles = await this.rolesRepository.findBy({ id: In(ids) });
    if (roles) {
      return roles;
    }
    throw new EntityNotFoundException('Role');
  }

  async update(id: number, role: UpdateRoleDto) {
    const existingRole = await this.rolesRepository.findOne({ where: { id }, relations: ['permissions'] });
    if (!existingRole) {
      throw new EntityNotFoundException('Role', id);
    }

    const { permissionIds, ...roleWithoutPermissions } = role;
    if (permissionIds && permissionIds.length > 0) {
      const permissions = await this.permissionsService.getByIds(permissionIds);
      existingRole.permissions = permissions;
      await this.rolesRepository.save(existingRole);
    }

    await this.rolesRepository.update(id, roleWithoutPermissions);
    const updatedRole = this.rolesRepository.findOne({
      where: { id },
      relations: ['permissions']
    });

    return updatedRole;
  }

  async create(role: CreateRoleDto) {
    // find categories
    const permissions = await this.permissionsService.getByIds(role.permissionIds);

    console.log('permissions:', permissions);
    const newRole = this.rolesRepository.create({
      ...role,
      permissions: permissions
    });

    await this.rolesRepository.save(newRole);
    return newRole;
  }

  async delete(id: number) {
    const deletedRole = await this.rolesRepository.delete(id);
    if (!deletedRole.affected) {
      throw new EntityNotFoundException('Role', id);
    }
  }
}
