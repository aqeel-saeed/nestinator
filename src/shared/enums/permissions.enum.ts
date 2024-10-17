import { CategoryPermissionsEnum } from "../../core/modules/categories/permissions/categories-permissions.enum";
import { PostPermissionsEnum } from "../../core/modules/posts/permissions/posts-permissions.enum";

export const PermissionsEnum = {
    ...PostPermissionsEnum,
    ...CategoryPermissionsEnum
}

export type permissionType = 
    PostPermissionsEnum | 
    CategoryPermissionsEnum
    ; 
