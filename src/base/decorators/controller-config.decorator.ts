import { applyDecorators, SetMetadata } from "@nestjs/common";
import { BaseControllerConfig } from "../interfaces/base-controller-config.interface";

export const ControllerConfig = (
    config: BaseControllerConfig,
) => 
    applyDecorators(
        SetMetadata('config', config),
    );