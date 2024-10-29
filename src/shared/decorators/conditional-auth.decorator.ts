import { applyDecorators, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { PermissionsGuard } from "src/core/modules/permissions/guards/permissions.guard";

export function UseAuthAndPermissionsIf(condition: boolean) {
    if (condition) {
        return applyDecorators(
            ApiBearerAuth('Authorization'),
            UseGuards(JwtAuthGuard, PermissionsGuard),
        );
    }

    return () => {};
}