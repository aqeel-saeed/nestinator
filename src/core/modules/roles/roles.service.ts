import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { In, Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundException } from 'src/shared/exceptions/not-found.exception';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
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
    await this.rolesRepository.update(id, role);
    const updatedRole = this.rolesRepository.findOne({
      where: { id },
      relations: ['permissions']
    });
    if (updatedRole) {
      return updatedRole;
    }
    throw new EntityNotFoundException('Role', id);
  }

  async create(role: CreateRoleDto) {
    const newRole = this.rolesRepository.create(role);
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
