import { BaseControllerAuthOptions } from 'src/base/interfaces/base-controller-auth-options.interface';
import { BaseControllerConfig } from 'src/base/interfaces/base-controller-config.interface';
import { categoriesControllerPermissions } from './permissions/categories-controller-permissions.enum';

export const categoriesControllerConfig: BaseControllerConfig = {
  endpointName: 'categories',
  entityClassName: 'Category',
  entitySingleName: 'Category',
  entityPluralName: 'Categories',
  authOptions: new BaseControllerAuthOptions(categoriesControllerPermissions),
  ownerShipRelationPath: [],
  ownerField: '',
};
