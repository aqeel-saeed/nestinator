import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { BaseCrudController } from 'src/base/base-crud.controller';
import { usersControllerPermissions } from './permissions/users-controller-permissions';
import { usersControllerConfig } from './users.config';
import { UseAuthAndPermissionsIf } from 'src/shared/decorators/conditional-auth.decorator';
import { apiResponse } from 'src/shared/utils/utils';
import * as bcrypt from 'bcrypt';
import { ControllerConfig } from 'src/base/decorators/controller-config.decorator';
import { ControllerPermissions } from '../../core/permissions/decorators/controller-permissions.decorator';

const BaseController = BaseCrudController<User, CreateUserDto, UpdateUserDto>(
  usersControllerConfig,
  CreateUserDto,
  UpdateUserDto,
);

@Controller(usersControllerConfig.endpointName)
@ControllerPermissions(usersControllerPermissions)
@ControllerConfig(usersControllerConfig)
export class UsersController extends BaseController {
  constructor(readonly usersService: UsersService) {
    super(usersService);
  }

  @UseAuthAndPermissionsIf(
    usersControllerConfig.authOptions.getUsingAuthBoolean().create,
  )
  @Post()
  async create(@Body() user: CreateUserDto) {
    // hashing password before create user
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user['password'] = hashedPassword;

    const res = await this.service.create(user);
    return apiResponse(
      res,
      `${usersControllerConfig.entitySingleName} created successfully.`,
    );
  }
}
