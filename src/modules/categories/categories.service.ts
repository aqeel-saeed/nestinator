import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './repositories/category.repository';
import { BaseService } from 'src/base/base.service';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService extends BaseService<Category> {
  constructor(private readonly categoryRepository: CategoryRepository) {
    super(categoryRepository);
  }
}
