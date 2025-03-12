import { Injectable, NotFoundException } from '@nestjs/common';
import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { isSoftDeleteEnabled } from '../shared/decorators/soft-delete.decorator';
import { FilteringService } from '../core/data-filtering/filtering.service';
import { FilterBuilder } from '../core/data-filtering/filter-builder';
import { Filtering } from '../core/data-filtering/filtering.interface';

@Injectable()
export class BaseRepository<T extends object> {
  private filterBuilder: FilterBuilder<T>;

  constructor(
    private readonly repository: Repository<T>,
    private readonly filteringService: FilteringService<T>,
  ) {
    this.filterBuilder = new FilterBuilder<T>(
      filteringService.getStrategyRegistry(),
    );
  }

  async findAll(filters?: Filtering[]): Promise<T[]> {
    const options: FindManyOptions<T> = {};

    if (filters && filters.length > 0) {
      options.where = this.filterBuilder.build(filters);
    }

    // TODO: add pagination and sort here in the options.order and options.skip and options.take

    return this.repository.find(options);
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
