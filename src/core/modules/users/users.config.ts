import { BaseControllerAuthOptions } from 'src/base/interfaces/base-controller-auth-options.interface';
import { BaseControllerConfig } from 'src/base/interfaces/base-controller-config.interface';
import { usersControllerPermissions } from './permissions/users-controller-permissions';

export const usersControllerConfig: BaseControllerConfig = {
  endpointName: 'users',
  entityClassName: 'User',
  entitySingleName: 'User',
  entityPluralName: 'Users',
  authOptions: new BaseControllerAuthOptions(usersControllerPermissions),
  ownerShipRelationPath: [],
  ownerField: '',
};
