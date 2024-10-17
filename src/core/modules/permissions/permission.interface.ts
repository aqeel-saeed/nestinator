import { permissionType, PermissionsEnum } from "../../../shared/enums/permissions.enum";

export interface Permission {
    key: permissionType;
    name_en: string;
    name_ar: string;
}
