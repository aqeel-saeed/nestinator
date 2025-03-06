import { Injectable, NotFoundException } from '@nestjs/common';
import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { isSoftDeleteEnabled } from '../shared/decorators/soft-delete.decorator';

@Injectable()
export class BaseRepository<T extends object> {
  constructor(private readonly repository: Repository<T>) {}

  // Add custom methods here
  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<T> {
    const entity = await this.repository.findOne({ where: { id } as any });
    if (!entity) {
      throw new NotFoundException(`Entity with ID ${id} not found`);
    }
    return entity;
  }

  async findOne(options: FindOptionsWhere<T>): Promise<T> {
    const entity = await this.repository.findOne({ where: options });
    if (!entity) {
      throw new NotFoundException(`Entity not found`);
    }
    return entity;
  }

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async update(id: number, data: DeepPartial<T>): Promise<T> {
    const entity = await this.findById(id);
    Object.assign(entity, data);
    return this.repository.save(entity);
  }

  async delete(id: number): Promise<void> {
    const entity = await this.findOne({ id } as unknown as FindOptionsWhere<T>);

    // Check if soft delete is enabled for the entity
    if (isSoftDeleteEnabled(entity)) {
      // Perform soft delete
      console.log('applying soft delete');
      await this.repository.softDelete(id);
    } else {
      // Perform hard delete
      console.log('applying hard delete');
      await this.repository.delete(id);
    }
  }

  async findOneRaw(options: FindOneOptions<T>): Promise<T | null> {
    return this.repository.findOne(options);
  }

  async findAllRaw(options: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }
}
