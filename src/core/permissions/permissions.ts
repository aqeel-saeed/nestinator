import { CategoryPermissionsEnum } from '../../modules/categories/permissions/categories-permissions.enum';
import { PostPermissionsEnum } from '../../modules/posts/permissions/posts-permissions.enum';
import { RolePermissionsEnum } from '../../modules/roles/permissions/roles-permissions.enum';
import { UserPermissionsEnum } from '../../modules/users/permissions/users-permissions.enum';
import { Permission } from './entities/permission.entity';
import { PermissionPermissionsEnum } from './permissions/permissions-permissions.enum';

// TODO: fix this issue in permissions by passing a CreatePermissionDto for the seeder

export const permissions: Permission[] = [
  // Posts Permissions
  {
    key: PostPermissionsEnum.POST_INDEX,
    name_en: 'index all posts',
    name_ar: 'استعراض كافة المنشورات',
  } as Permission,
  {
    key: PostPermissionsEnum.POST_SHOW,
    name_en: 'show post details',
    name_ar: 'عرض تفاصيل منشور',
  } as Permission,
  {
    key: PostPermissionsEnum.POST_CREATE,
    name_en: 'create a post',
    name_ar: 'إنشاء منشور',
  } as Permission,
  {
    key: PostPermissionsEnum.POST_UPDATE,
    name_en: 'update a post',
    name_ar: 'تعديل منشور',
  } as Permission,
  {
    key: PostPermissionsEnum.POST_DELETE,
    name_en: 'delete a post',
    name_ar: 'حذف منشور',
  } as Permission,
  {
    key: PostPermissionsEnum.POST_UPDATE_OWN,
    name_en: 'update owned posts only',
    name_ar: 'تعديل المنشورات المملوكة فقط',
  } as Permission,
  {
    key: PostPermissionsEnum.POST_DELETE_OWN,
    name_en: 'delete owned posts only',
    name_ar: 'حذف المنشورات المملوكة فقط',
  } as Permission,
  // Categories Permissions
  {
    key: CategoryPermissionsEnum.CATEGORY_INDEX,
    name_en: 'index all categories',
    name_ar: 'استعراض كافة التصنيفات',
  } as Permission,
  {
    key: CategoryPermissionsEnum.CATEGORY_SHOW,
    name_en: 'show category details',
    name_ar: 'عرض تفاصيل تصنيف',
  } as Permission,
  {
    key: CategoryPermissionsEnum.CATEGORY_CREATE,
    name_en: 'create a category',
    name_ar: 'إنشاء تصنيف',
  } as Permission,
  {
    key: CategoryPermissionsEnum.CATEGORY_UPDATE,
    name_en: 'update a category',
    name_ar: 'تعديل تصنيف',
  } as Permission,
  {
    key: CategoryPermissionsEnum.CATEGORY_DELETE,
    name_en: 'delete a category',
    name_ar: 'حذف تصنيف',
  } as Permission,
  // Users Permissions
  {
    key: UserPermissionsEnum.USER_INDEX,
    name_en: 'index all users',
    name_ar: 'استعراض كافة المستخدمين',
  } as Permission,
  {
    key: UserPermissionsEnum.USER_SHOW,
    name_en: 'show user details',
    name_ar: 'عرض تفاصيل مستخدم',
  } as Permission,
  {
    key: UserPermissionsEnum.USER_CREATE,
    name_en: 'create a user',
    name_ar: 'إنشاء مستخدم',
  } as Permission,
  {
    key: UserPermissionsEnum.USER_UPDATE,
    name_en: 'update a user',
    name_ar: 'تعديل مستخدم',
  } as Permission,
  {
    key: UserPermissionsEnum.USER_DELETE,
    name_en: 'delete a user',
    name_ar: 'حذف مستخدم',
  } as Permission,
  // Roles Permissions
  {
    key: RolePermissionsEnum.ROLE_INDEX,
    name_en: 'index all roles',
    name_ar: 'استعراض كافة الأدوار',
  } as Permission,
  {
    key: RolePermissionsEnum.ROLE_SHOW,
    name_en: 'show role details',
    name_ar: 'عرض تفاصيل دور',
  } as Permission,
  {
    key: RolePermissionsEnum.ROLE_CREATE,
    name_en: 'create a role',
    name_ar: 'إنشاء دور',
  } as Permission,
  {
    key: RolePermissionsEnum.ROLE_UPDATE,
    name_en: 'update a role',
    name_ar: 'تعديل دور',
  } as Permission,
  {
    key: RolePermissionsEnum.ROLE_DELETE,
    name_en: 'delete a role',
    name_ar: 'حذف دور',
  } as Permission,
  // Permissions Permissions
  {
    key: PermissionPermissionsEnum.PERMISSION_INDEX,
    name_en: 'index all permissions',
    name_ar: 'استعراض كافة الصلاحيات',
  } as Permission,
  {
    key: PermissionPermissionsEnum.PERMISSION_SHOW,
    name_en: 'show permission details',
    name_ar: 'عرض تفاصيل الصلاحية',
  } as Permission,
];
