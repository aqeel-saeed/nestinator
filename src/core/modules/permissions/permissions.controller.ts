import { baseControllerFactory } from 'src/base/base.controller';
import { Permission } from './entities/permission.entity';
import { permissionsControllerConfig } from './permissions.config';
import { Controller } from '@nestjs/common';
import { ControllerPermissions } from './decorators/controller-permissions.decorator';
import { permissionsControllerPermissions } from './permissions/permissions-controller-permissions';
import { PermissionsService } from './permissions.service';
import { apiResponse } from 'src/shared/utils/utils';
import { ControllerConfig } from 'src/base/decorators/controller-config.decorator';

const BaseController = baseControllerFactory<Permission, undefined, undefined>(
  permissionsControllerConfig,
  undefined,
  undefined,
);

@Controller(permissionsControllerConfig.endpointName)
@ControllerPermissions(permissionsControllerPermissions)
@ControllerConfig(permissionsControllerConfig)
export class PermissionsController extends BaseController {
  constructor(readonly permissionsService: PermissionsService) {
    super(permissionsService);
  }

  async create(): Promise<{ data: any; message: string }> {
    return apiResponse(null, 'Create method not supported in this controller.');
  }

  async update(): Promise<{ data: any; message: string }> {
    return apiResponse(null, 'Update method not supported in this controller.');
  }

  async delete(): Promise<{ data: any; message: string }> {
    return apiResponse(null, 'Delete method not supported in this controller.');
  }
}
