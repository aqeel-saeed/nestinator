import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { permissionType } from "src/shared/enums/permissions.enum";

export const ControllerPermissions = (permissions: Record<string, permissionType | permissionType[]>) =>
  applyDecorators(
    SetMetadata('permissions', permissions),
  );