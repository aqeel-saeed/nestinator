import { applyDecorators, SetMetadata } from '@nestjs/common';
import { BaseCrudControllerConfig } from '../interfaces/base-controller-config.interface';

export const ControllerConfig = (config: BaseCrudControllerConfig) =>
  applyDecorators(SetMetadata('config', config));
