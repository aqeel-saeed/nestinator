import { ControllerPermissionsOptionType } from "src/base/interfaces/base-controller-permissions.interface";
import { UserPermissionsEnum } from "./users-permissions.enum";

export const usersControllerPermissions: ControllerPermissionsOptionType = {
    'create': [UserPermissionsEnum.USER_CREATE],
    'update': [UserPermissionsEnum.USER_UPDATE],
    'delete': [UserPermissionsEnum.USER_DELETE],
};