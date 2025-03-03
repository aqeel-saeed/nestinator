import { BaseControllerAuthOptions } from 'src/base/interfaces/base-controller-auth-options.interface';
import { BaseCrudControllerConfig } from 'src/base/interfaces/base-controller-config.interface';
import { postsControllerPermissions } from './permissions/posts-controller-permissions';

export const postsControllerConfig: BaseCrudControllerConfig = {
  endpointName: 'posts',
  entityClassName: 'Post',
  entitySingleName: 'Post',
  entityPluralName: 'Posts',
  authOptions: new BaseControllerAuthOptions(postsControllerPermissions),
  ownerShipRelationPath: [],
  ownerField: 'authorId',
};
