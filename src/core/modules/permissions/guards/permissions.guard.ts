import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { permissionType } from "src/shared/enums/permissions.enum";

@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(
        private reflector: Reflector
    ) {}

    async canActivate(context: ExecutionContext) {
        const permissions = this.reflector.getAllAndOverride<Record<string, permissionType[] | permissionType>>(
            'permissions',
            [
                context.getHandler(),
                context.getClass()
            ]
        );
        
        if (!permissions) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        const methodName = context.getHandler().name;
        let requiredPermissions = permissions[methodName];

        // console.log('DD req permissions', requiredPermissions);
        // console.log('DD user permissions', user.permissions);

        if (!requiredPermissions) {
            return true;
        }

        if (!Array.isArray(requiredPermissions)) {
            requiredPermissions = [requiredPermissions]
        }

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