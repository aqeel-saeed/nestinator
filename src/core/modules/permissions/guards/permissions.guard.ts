import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { permissionType } from "src/shared/enums/permissions.enum";

@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(
        private reflector: Reflector
    ) {}

    async canActivate(context: ExecutionContext) {
        const requiredPermissions = this.reflector.getAllAndOverride<permissionType[]>(
            'permissions',
            [
                context.getHandler(),
                context.getClass()
            ]
        );

        if (!requiredPermissions) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!user || !user.permissions) {
            throw new ForbiddenException(
                "User doesn't have any permissions"
            );
        }

        const userPermissions = user.permissions;
        
        const hasPermission = requiredPermissions.some(permission =>
            userPermissions.includes(permission)
        );
        
        if (!hasPermission) {
            throw new ForbiddenException(
                "You don't have permission to perform this operation.",
            );
        }

        return true;
    }
}