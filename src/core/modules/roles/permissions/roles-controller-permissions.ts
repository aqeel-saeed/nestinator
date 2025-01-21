import { ControllerPermissionsOptionType } from 'src/base/interfaces/base-controller-permissions.interface';
import { RolePermissionsEnum } from './roles-permissions.enum';

export const rolesControllerPermissions: ControllerPermissionsOptionType = {
  index: [RolePermissionsEnum.ROLE_INDEX],
  show: [RolePermissionsEnum.ROLE_SHOW],
  create: [RolePermissionsEnum.ROLE_CREATE],
  update: [RolePermissionsEnum.ROLE_UPDATE],
  delete: [RolePermissionsEnum.ROLE_DELETE],
};
