import { PostPermissionsEnum } from "../posts/permissions/posts-permissions.enum";
import { CategoryPermissionsEnum } from "../categories/permissions/categories-permissions.enum";
import { Permission } from "./entities/permission.entity";

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
];