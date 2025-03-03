import { BaseControllerAuthOptions } from 'src/base/interfaces/base-controller-auth-options.interface';
import { BaseCrudControllerConfig } from 'src/base/interfaces/base-controller-config.interface';
import { rolesControllerPermissions } from './permissions/roles-controller-permissions';

export const rolesControllerConfig: BaseCrudControllerConfig = {
  endpointName: 'roles',
  entityClassName: 'Role',
  entitySingleName: 'Role',
  entityPluralName: 'Roles',
  authOptions: new BaseControllerAuthOptions(rolesControllerPermissions),
  ownerShipRelationPath: [],
  ownerField: '',
};
