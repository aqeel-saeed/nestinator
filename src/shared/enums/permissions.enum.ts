import { PermissionPermissionsEnum } from '../../core/modules/permissions/permissions/permissions-permissions.enum';
import { CategoryPermissionsEnum } from '../../core/modules/categories/permissions/categories-permissions.enum';
import { PostPermissionsEnum } from '../../core/modules/posts/permissions/posts-permissions.enum';
import { RolePermissionsEnum } from '../../core/modules/roles/permissions/roles-permissions.enum';
import { UserPermissionsEnum } from '../../core/modules/users/permissions/users-permissions.enum';

export const PermissionsEnum = {
  ...PostPermissionsEnum,
  ...CategoryPermissionsEnum,
  ...PermissionPermissionsEnum,
  ...RolePermissionsEnum,
  ...UserPermissionsEnum,
};

export type permissionType =
  | PostPermissionsEnum
  | CategoryPermissionsEnum
  | PermissionPermissionsEnum
  | RolePermissionsEnum
  | UserPermissionsEnum;
