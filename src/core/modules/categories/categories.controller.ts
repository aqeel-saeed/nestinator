import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { BaseController } from 'src/base/base.controller';
import { Category } from './entities/category.entity';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController extends BaseController<Category, CreateCategoryDto, UpdateCategoryDto> {
    constructor(
        private readonly categoriesService: CategoriesService
    ) {
        super(categoriesService);
    }
}
