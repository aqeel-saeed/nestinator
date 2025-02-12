import { PermissionPermissionsEnum } from '../../core/permissions/permissions/permissions-permissions.enum';
import { CategoryPermissionsEnum } from '../../modules/categories/permissions/categories-permissions.enum';
import { PostPermissionsEnum } from '../../modules/posts/permissions/posts-permissions.enum';
import { RolePermissionsEnum } from '../../modules/roles/permissions/roles-permissions.enum';
import { UserPermissionsEnum } from '../../modules/users/permissions/users-permissions.enum';

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
