import { ControllerPermissionsOptionType } from "./base-controller-permissions.interface";

export class BaseControllerAuthOptions {
    controllerPermissionsOptions: ControllerPermissionsOptionType;

    constructor(controllerPermissionsOptions: ControllerPermissionsOptionType) {
        this.controllerPermissionsOptions = controllerPermissionsOptions;
    }

    // this method returns an object of each methodName as a key, and boolean as a value
    // boolean value should be true if we have a permissions for this key, false if null or undefined
    getUsingAuthBoolean(): Record<string, boolean> {
        const authBoolean: Record<string, boolean> = {};

        // iterate over each key-value pair in controllerPermissionsOptions
        for (const methodName in this.controllerPermissionsOptions) {
            const permissions = this.controllerPermissionsOptions[methodName];
            
            // if permissions exist and are non-empty, set to true; otherwise, set to false
            authBoolean[methodName] = !!permissions && (Array.isArray(permissions) ? permissions.length > 0 : true);
        }

        return authBoolean;
    }
}