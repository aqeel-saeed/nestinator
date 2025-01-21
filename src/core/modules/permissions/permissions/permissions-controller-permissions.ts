import { ControllerPermissionsOptionType } from 'src/base/interfaces/base-controller-permissions.interface';
import { PermissionPermissionsEnum } from './permissions-permissions.enum';

export const permissionsControllerPermissions: ControllerPermissionsOptionType =
  {
    create: [PermissionPermissionsEnum.PERMISSION_CREATE],
    update: [PermissionPermissionsEnum.PERMISSION_UPDATE],
    delete: [PermissionPermissionsEnum.PERMISSION_DELETE],
  };
