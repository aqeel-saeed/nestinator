import { NotFoundException } from '@nestjs/common';

export class EntityNotFoundException extends NotFoundException {
  constructor(entityName: string = 'Entity', entityId?: number) {
    if (entityId) {
      super(entityName + ' with id ' + entityId + ' not found.');
    } else {
      super(entityName + ' not found.');
    }
  }
}
