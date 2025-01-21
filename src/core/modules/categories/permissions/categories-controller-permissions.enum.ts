import { ControllerPermissionsOptionType } from 'src/base/interfaces/base-controller-permissions.interface';
import { CategoryPermissionsEnum } from './categories-permissions.enum';

export const categoriesControllerPermissions: ControllerPermissionsOptionType =
  {
    create: [CategoryPermissionsEnum.CATEGORY_CREATE],
    update: [CategoryPermissionsEnum.CATEGORY_UPDATE],
    delete: [CategoryPermissionsEnum.CATEGORY_DELETE],
  };
