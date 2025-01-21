import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { OwnershipCheckService } from 'src/shared/utils/ownership-check.util';
import { BaseControllerConfig } from 'src/base/interfaces/base-controller-config.interface';
import { ControllerPermissionsOptionType } from 'src/base/interfaces/base-controller-permissions.interface';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private ownershipCheckService: OwnershipCheckService,
  ) {}

  async canActivate(context: ExecutionContext) {
    // get controller config
    const config = this.reflector.get<BaseControllerConfig>(
      'config',
      context.getClass(),
    );

    // destructure the properties needed for permissions check
    const { endpointName, ownerShipRelationPath, ownerField } = config || {};

    // if config is missing or misconfigured, throw an error
    if (!config) {
      throw new Error(
        'Controller configuration is missing required properties.',
      );
    }

    // fetch controller permissions object from the controller MetaData
    const permissions =
      this.reflector.getAllAndOverride<ControllerPermissionsOptionType>(
        'permissions',
        [context.getHandler(), context.getClass()],
      );

    // if no permissions, user can make this action
    if (!permissions) {
      return true;
    }

    // get the user from the request
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // get the controller method name from the request
    const methodName = context.getHandler().name;
    // get permissions related to the controller method from the controller permissions
    let requiredPermissions = permissions[methodName];

    // log for debugging
    // console.log('DD req permissions', requiredPermissions);
    // console.log('DD user permissions', user.permissions);

    // if no permissions for this method, user can make this action
    if (!requiredPermissions) {
      return true;
    }

    // convert requiredPermissions into array
    if (!Array.isArray(requiredPermissions)) {
      requiredPermissions = [requiredPermissions];
    }

    // if there is no user, of user does not have permissions, throw an exception
    if (!user || !user.permissions) {
      throw new ForbiddenException("User doesn't have any permissions");
    }

    // fetch user permissions
    const userPermissions = user.permissions;

    // check if user has any non-own (standard) permissions
    const hasStandardPermission = requiredPermissions.some(
      (permission) =>
        !permission.endsWith('_own') && userPermissions.includes(permission),
    );

    // if the user has a standard permission, grant access without an ownership check
    if (hasStandardPermission) {
      return true;
    }

    // if the user has only paramed permissions, perform ownership check
    const hasOwnershipPermission = requiredPermissions.some(
      (permission) =>
        permission.endsWith('_own') && userPermissions.includes(permission),
    );

    if (hasOwnershipPermission) {
      const entityId = request.params['id'];
      if (!entityId) {
        throw new ForbiddenException(
          'Entity ID is required for ownership validation.',
        );
      }

      console.log('DD entityId in the guard:', entityId);
      console.log('DD user in the guard:', user.userId);

      const isOwner = await this.ownershipCheckService.isOwner(
        endpointName,
        +entityId,
        user.userId,
        ownerShipRelationPath,
        ownerField,
      );

      if (!isOwner) {
        throw new ForbiddenException('You do not own this entity.');
      }

      return true;
    }

    throw new ForbiddenException(
      "You don't have permission to perform this operation.",
    );
  }
}
