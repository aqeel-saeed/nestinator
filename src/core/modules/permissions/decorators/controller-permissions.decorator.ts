import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { permissionType } from "src/shared/enums/permissions.enum";
import { PermissionsGuard } from "../guards/permissions.guard";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

export const ControllerPermissions = (permissions: Record<string, permissionType | permissionType[]>) =>
  applyDecorators(
    SetMetadata('permissions', permissions),
    // ApiBearerAuth('Authorization'),
    // UseGuards(JwtAuthGuard, PermissionsGuard),
  );