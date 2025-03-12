import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/base/base.repository';
import { Category } from '../entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FilteringService } from '../../../shared/utils/data-filtering/filtering.service';

@Injectable()
export class CategoryRepository extends BaseRepository<Category> {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    filteringService: FilteringService<Category>,
  ) {
    super(categoryRepository, filteringService);
  }
}
