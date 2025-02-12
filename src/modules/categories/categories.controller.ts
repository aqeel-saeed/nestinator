import { Controller } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
import { baseControllerFactory } from 'src/base/base.controller';
import { categoriesControllerConfig } from './categories.config';
import { categoriesControllerPermissions } from './permissions/categories-controller-permissions.enum';
import { ControllerConfig } from 'src/base/decorators/controller-config.decorator';
import { ControllerPermissions } from '../../core/permissions/decorators/controller-permissions.decorator';

const BaseController = baseControllerFactory<
  Category,
  CreateCategoryDto,
  UpdateCategoryDto
>(categoriesControllerConfig, CreateCategoryDto, UpdateCategoryDto);

@Controller(categoriesControllerConfig.endpointName)
@ControllerPermissions(categoriesControllerPermissions)
@ControllerConfig(categoriesControllerConfig)
export class CategoriesController extends BaseController {
  constructor(readonly categoriesService: CategoriesService) {
    super(categoriesService);
  }
}
