import { BaseControllerAuthOptions } from 'src/base/interfaces/base-controller-auth-options.interface';
import { BaseCrudControllerConfig } from 'src/base/interfaces/base-controller-config.interface';
import { permissionsControllerPermissions } from './permissions/permissions-controller-permissions';

export const permissionsControllerConfig: BaseCrudControllerConfig = {
  endpointName: 'permissions',
  entityClassName: 'Permission',
  entitySingleName: 'Permission',
  entityPluralName: 'Permissions',
  authOptions: new BaseControllerAuthOptions(permissionsControllerPermissions),
  ownerShipRelationPath: [],
  ownerField: '',
};
