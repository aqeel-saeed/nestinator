import { Controller } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolesService } from './roles.service';
import { Role } from './entities/role.entity';
import { BaseCrudController } from 'src/base/base-crud.controller';
import { rolesControllerPermissions } from './permissions/roles-controller-permissions';
import { rolesControllerConfig } from './roles.config';
import { ControllerConfig } from 'src/base/decorators/controller-config.decorator';
import { ControllerPermissions } from '../../core/permissions/decorators/controller-permissions.decorator';

const BaseController = BaseCrudController<Role, CreateRoleDto, UpdateRoleDto>(
  rolesControllerConfig,
  CreateRoleDto,
  UpdateRoleDto,
);

@Controller(rolesControllerConfig.endpointName)
@ControllerPermissions(rolesControllerPermissions)
@ControllerConfig(rolesControllerConfig)
export class RolesController extends BaseController {
  constructor(readonly rolesService: RolesService) {
    super(rolesService);
  }
}
