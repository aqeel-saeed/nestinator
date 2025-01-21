import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './repositories/category.repository';
import { BaseService } from 'src/base/base.service';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriesService extends BaseService<Category> {
  constructor(
    @InjectRepository(Category)
    protected readonly categoryRepository: CategoryRepository,
  ) {
    super(categoryRepository);
  }
}
