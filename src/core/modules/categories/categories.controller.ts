import { Body, Controller, Post, Req } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoriesService } from './categories.service';
import { apiResponse } from 'src/core/utils/utils';
import { Category} from './entities/category.entity';
import { ControllerPermissions } from '../permissions/decorators/controller-permissions.decorator';
import { baseControllerFactory } from "src/base/base.controller";
import { UseAuthAndPermissionsIf } from 'src/shared/decorators/conditional-auth.decorator';
import { categoriesControllerConfig } from './categories.config';
import { categoriesControllerPermissions } from './permissions/categories-controller-permissions.enum';

const BaseController = baseControllerFactory<
    Category,
    CreateCategoryDto,
    UpdateCategoryDto
  >(
    categoriesControllerConfig,
    CreateCategoryDto,
    UpdateCategoryDto
  );

@Controller(categoriesControllerConfig.endpointName)
@ControllerPermissions(categoriesControllerPermissions)
export class CategoriesController extends BaseController {
  constructor(
     readonly categoriesService: CategoriesService,
  ) {
    super(categoriesService);
  }
}