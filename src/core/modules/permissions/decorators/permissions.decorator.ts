import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { permissionType } from "src/shared/enums/permissions.enum";
import { PermissionsGuard } from "../guards/permissions.guard";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

export const RequirePermissions = (...permissions: permissionType[]) =>
    applyDecorators(
        SetMetadata('permissions', permissions),
        UseGuards(JwtAuthGuard, PermissionsGuard)
    );
    