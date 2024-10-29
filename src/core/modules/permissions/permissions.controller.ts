import { baseControllerFactory } from "src/base/base.controller";
import { Permission } from "./entities/permission.entity";
import { permissionsControllerConfig } from "./permissions.config";
import { Controller } from "@nestjs/common";
import { ControllerPermissions } from "./decorators/controller-permissions.decorator";
import { permissionsControllerPermissions } from "./permissions/permissions-controller-permissions";
import { PermissionsService } from "./permissions.service";
import { apiResponse } from "src/core/utils/utils";
import { FindOneParams } from "src/shared/params/find-one.params";

const BaseController = baseControllerFactory<
    Permission,
    undefined,
    undefined
    >(
        permissionsControllerConfig,
        undefined,
        undefined
    );

@Controller(permissionsControllerConfig.endpointName)
@ControllerPermissions(permissionsControllerPermissions)
export class PermissionsController extends BaseController {
    constructor(
        readonly permissionsService: PermissionsService,
    ) {
        super(permissionsService);
    }

    async create(data: undefined, req: any): Promise<{ data: any; message: string; }> {
        return apiResponse(null, 'Create method not supported in this controller.')
    }

    async update({ id }: FindOneParams, data: undefined, req: any): Promise<{ data: any; message: string; }> {
        return apiResponse(null, 'Update method not supported in this controller.')
    }

    async delete({ id }: FindOneParams): Promise<{ data: any; message: string; }> {
        return apiResponse(null, 'Delete method not supported in this controller.')
    }
}