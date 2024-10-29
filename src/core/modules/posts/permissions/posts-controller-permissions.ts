import { ControllerPermissionsOptionType } from "src/base/interfaces/base-controller-permissions.interface";
import { PostPermissionsEnum } from "./posts-permissions.enum";

export const postsControllerPermissions: ControllerPermissionsOptionType = {
    'create': [PostPermissionsEnum.POST_CREATE],
    'update': [PostPermissionsEnum.POST_UPDATE],
    'delete': [PostPermissionsEnum.POST_DELETE],
};