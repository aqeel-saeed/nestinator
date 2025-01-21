import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { EntityManager } from 'typeorm';

// decorator options interface
export type IsExistedInterface = {
  table: string;
  column: string;
};

@ValidatorConstraint({ name: 'IsExistedConstraint', async: true })
@Injectable()
export class IsExistedConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async validate(value: any, args?: ValidationArguments): Promise<boolean> {
    if (value === null || value === undefined) {
      return true;
    }

    // catch options from decorator
    const { table, column }: IsExistedInterface = args.constraints[0];

    // handle signle value or array
    if (!Array.isArray(value)) {
      value = [value];
    }

    // database query check data is exists
    const dataExisted = await this.entityManager
      .getRepository(table)
      .createQueryBuilder(table)
      .where(`${column} IN (:...ids)`, { ids: value }) // Use the spread operator for correct parameter binding
      .getCount();

    return dataExisted == value.length;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    const field: string = validationArguments.property;
    const options: IsExistedInterface = validationArguments.constraints[0];
    return `The provided value(s) for ${field} do not exist in the ${options.table} table under the ${options.column} column.`;
  }
}

export function IsExisted(
  options: IsExistedInterface,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isExisted',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [options],
      validator: IsExistedConstraint,
    });
  };
}
