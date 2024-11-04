import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { ControllerPermissionsOptionType } from "src/base/interfaces/base-controller-permissions.interface";

export const ControllerPermissions = (
  permissions: ControllerPermissionsOptionType,
) =>
  applyDecorators(
    SetMetadata('permissions', permissions),
  );