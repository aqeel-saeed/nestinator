import { PostPermissionsEnum } from '../posts/permissions/posts-permissions.enum';
import { CategoryPermissionsEnum } from '../categories/permissions/categories-permissions.enum';
import { Permission } from './entities/permission.entity';
import { UserPermissionsEnum } from '../users/permissions/users-permissions.enum';
import { RolePermissionsEnum } from '../roles/permissions/roles-permissions.enum';
import { PermissionPermissionsEnum } from './permissions/permissions-permissions.enum';

export const permissions: Permission[] = [
  // Posts Permissions
  {
    key: PostPermissionsEnum.POST_INDEX,
    name_en: 'index all posts',
    name_ar: 'استعراض كافة المنشورات',
  },
  {
    key: PostPermissionsEnum.POST_SHOW,
    name_en: 'show post details',
    name_ar: 'عرض تفاصيل منشور',
  },
  {
    key: PostPermissionsEnum.POST_CREATE,
    name_en: 'create a post',
    name_ar: 'إنشاء منشور',
  },
  {
    key: PostPermissionsEnum.POST_UPDATE,
    name_en: 'update a post',
    name_ar: 'تعديل منشور',
  },
  {
    key: PostPermissionsEnum.POST_DELETE,
    name_en: 'delete a post',
    name_ar: 'حذف منشور',
  },
  {
    key: PostPermissionsEnum.POST_UPDATE_OWN,
    name_en: 'update owned posts only',
    name_ar: 'تعديل المنشورات المملوكة فقط',
  },
  {
    key: PostPermissionsEnum.POST_DELETE_OWN,
    name_en: 'delete owned posts only',
    name_ar: 'حذف المنشورات المملوكة فقط',
  },
  // Categories Permissions
  {
    key: CategoryPermissionsEnum.CATEGORY_INDEX,
    name_en: 'index all categories',
    name_ar: 'استعراض كافة التصنيفات',
  },
  {
    key: CategoryPermissionsEnum.CATEGORY_SHOW,
    name_en: 'show category details',
    name_ar: 'عرض تفاصيل تصنيف',
  },
  {
    key: CategoryPermissionsEnum.CATEGORY_CREATE,
    name_en: 'create a category',
    name_ar: 'إنشاء تصنيف',
  },
  {
    key: CategoryPermissionsEnum.CATEGORY_UPDATE,
    name_en: 'update a category',
    name_ar: 'تعديل تصنيف',
  },
  {
    key: CategoryPermissionsEnum.CATEGORY_DELETE,
    name_en: 'delete a category',
    name_ar: 'حذف تصنيف',
  },
  // Users Permissions
  {
    key: UserPermissionsEnum.USER_INDEX,
    name_en: 'index all users',
    name_ar: 'استعراض كافة المستخدمين',
  },
  {
    key: UserPermissionsEnum.USER_SHOW,
    name_en: 'show user details',
    name_ar: 'عرض تفاصيل مستخدم',
  },
  {
    key: UserPermissionsEnum.USER_CREATE,
    name_en: 'create a user',
    name_ar: 'إنشاء مستخدم',
  },
  {
    key: UserPermissionsEnum.USER_UPDATE,
    name_en: 'update a user',
    name_ar: 'تعديل مستخدم',
  },
  {
    key: UserPermissionsEnum.USER_DELETE,
    name_en: 'delete a user',
    name_ar: 'حذف مستخدم',
  },
  // Roles Permissions
  {
    key: RolePermissionsEnum.ROLE_INDEX,
    name_en: 'index all roles',
    name_ar: 'استعراض كافة الأدوار',
  },
  {
    key: RolePermissionsEnum.ROLE_SHOW,
    name_en: 'show role details',
    name_ar: 'عرض تفاصيل دور',
  },
  {
    key: RolePermissionsEnum.ROLE_CREATE,
    name_en: 'create a role',
    name_ar: 'إنشاء دور',
  },
  {
    key: RolePermissionsEnum.ROLE_UPDATE,
    name_en: 'update a role',
    name_ar: 'تعديل دور',
  },
  {
    key: RolePermissionsEnum.ROLE_DELETE,
    name_en: 'delete a role',
    name_ar: 'حذف دور',
  },
  // Permissions Permissions
  {
    key: PermissionPermissionsEnum.PERMISSION_INDEX,
    name_en: 'index all permissions',
    name_ar: 'استعراض كافة الصلاحيات',
  },
  {
    key: PermissionPermissionsEnum.PERMISSION_SHOW,
    name_en: 'show permission details',
    name_ar: 'عرض تفاصيل الصلاحية',
  },
];
