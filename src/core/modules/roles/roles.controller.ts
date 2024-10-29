import { Body, Controller, Post, Req } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolesService } from './roles.service';
import { apiResponse } from 'src/core/utils/utils';
import { Role } from './entities/role.entity';
import { ControllerPermissions } from '../permissions/decorators/controller-permissions.decorator';
import { baseControllerFactory } from "src/base/base.controller";
import { UseAuthAndPermissionsIf } from 'src/shared/decorators/conditional-auth.decorator';
import { rolesControllerPermissions } from './permissions/roles-controller-permissions';
import { rolesControllerConfig } from './roles.config';

const BaseController = baseControllerFactory<
    Role,
    CreateRoleDto,
    UpdateRoleDto
  >(
    rolesControllerConfig,
    CreateRoleDto,
    UpdateRoleDto
  );

@Controller(rolesControllerConfig.endpointName)
@ControllerPermissions(rolesControllerPermissions)
export class RolesController extends BaseController {
  constructor(
     readonly rolesService: RolesService,
  ) {
    super(rolesService);
  }
}