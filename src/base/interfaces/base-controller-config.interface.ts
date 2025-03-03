import { BaseControllerAuthOptions } from './base-controller-auth-options.interface';

export interface BaseCrudControllerConfig {
  // should be the name of the entity in plural and small letter
  // please do not change this while it is auto generated
  endpointName: string;

  // TypeORM entity class name, and it should starts with capital letter, to be used in naming module elements like controller, service and so on
  entityClassName: string;

  // to be used in response messages and logs
  entitySingleName: string;
  entityPluralName: string;

  // crudAuthOptions: ;
  authOptions: BaseControllerAuthOptions;

  // the path from the entity to the id, to know how to check entity ownership in permissions
  ownerShipRelationPath: string[];

  // the name of the ownership field in the entity
  ownerField: string;
}
