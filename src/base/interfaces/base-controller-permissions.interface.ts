import { permissionType } from 'src/shared/enums/permissions.enum';

export type ControllerPermissionsOptionType = Record<
  string,
  permissionType | permissionType[] | undefined | null
>;

export interface ControllerBooleanPermissionsOptions {
  [methodName: string]: boolean;
}
