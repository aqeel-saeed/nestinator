import { BaseCrudController } from 'src/base/base-crud.controller';
import { Permission } from './entities/permission.entity';
import { permissionsControllerConfig } from './permissions.config';
import { Controller } from '@nestjs/common';
import { ControllerPermissions } from './decorators/controller-permissions.decorator';
import { permissionsControllerPermissions } from './permissions/permissions-controller-permissions';
import { PermissionsService } from './permissions.service';
import { ControllerConfig } from 'src/base/decorators/controller-config.decorator';

const BaseController = BaseCrudController<Permission, undefined, undefined>(
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

  async create(): Promise<{
    success: boolean;
    data: Permission;
    message: string;
  }> {
    return this.successResponse(
      'Create method not supported in this controller.',
    );
  }

  async update(): Promise<{
    success: boolean;
    data: Permission;
    message: string;
  }> {
    return this.successResponse(
      'Update method not supported in this controller.',
    );
  }

  async delete(): Promise<{
    success: boolean;
    data: Permission;
    message: string;
  }> {
    return this.successResponse(
      'Delete method not supported in this controller.',
    );
  }
}
