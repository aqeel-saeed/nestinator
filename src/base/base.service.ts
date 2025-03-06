import { DeepPartial } from 'typeorm';
import { BaseRepository } from './base.repository';

export class BaseService<T extends object> {
  constructor(protected readonly repository: BaseRepository<T>) {}

  async findAll(): Promise<T[]> {
    return this.repository.findAll();
  }

  async findById(id: number): Promise<T> {
    return this.repository.findById(id);
  }

  async create(data: DeepPartial<T>): Promise<T> {
    return this.repository.create(data);
  }

  async update(id: number, data: DeepPartial<T>): Promise<T> {
    return this.repository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    return this.repository.delete(id);
  }
}

// import { DeepPartial, In } from 'typeorm';
// import { BaseRepository } from './base.repository';
// import { NotFoundException } from '@nestjs/common';

// export class BaseService<T> {
//   constructor(protected readonly repository: BaseRepository<T>) {}

//   private async resolveRelations(
//     data: DeepPartial<T> | DeepPartial<T>[],
//   ): Promise<any | any[]> {
//     const isArray = Array.isArray(data);
//     // wrapping single data into an array for processing
//     const items = isArray ? data : [data];
//     const resolvedItems = await Promise.all(
//       items.map(async (item) => {
//         const resolvedItem = { ...item };
//         const entityMetadata = this.repository.metadata;
//         const relations = entityMetadata.relations;

//         for (const relation of relations) {
//           // Check whether the relation is singular (ManyToOne, OneToOne) or plural (OneToMany, ManyToMany)
//           const isSingularRelation =
//             relation.isManyToOne || relation.isOneToOne;
//           const isPluralRelation =
//             relation.isManyToMany || relation.isOneToMany;

//           // Assign singular or plural based on the relationship type
//           const relationId = isSingularRelation
//             ? `${relation.propertyName}Id`
//             : `${relation.propertyName}Ids`;

//           if (isSingularRelation) {
//             if (resolvedItem[relationId]) {
//               const relatedEntity = await this.repository.manager
//                 .getRepository(relation.type)
//                 .findOne({
//                   where: { id: resolvedItem[relationId] },
//                 });
//               if (!relatedEntity) {
//                 throw new NotFoundException(
//                   `${relation.propertyName} not found.`,
//                 );
//               }
//               resolvedItem[relation.propertyName] = relatedEntity;
//             }
//           } else if (isPluralRelation) {
//             if (Array.isArray(resolvedItem[relationId])) {
//               const relatedEntities = await this.repository.manager
//                 .getRepository(relation.type)
//                 .findBy({
//                   id: In(resolvedItem[relationId]),
//                 });
//               if (relatedEntities.length !== resolvedItem[relationId].length) {
//                 throw new NotFoundException(
//                   `not all ${relation.propertyName} entities found.`,
//                 );
//               }
//               resolvedItem[relation.propertyName] = relatedEntities;
//             }
//           }
//         }

//         return resolvedItem;
//       }),
//     );

//     // return array of resolved items or a single item
//     return isArray ? resolvedItems : resolvedItems[0];
//   }

//   async findAll(): Promise<T[]> {
//     return await this.repository.find();
//   }

//   async findById(id: number): Promise<T> {
//     const entity = await this.repository.findOne({
//       where: { id } as any,
//     });
//     if (!entity) {
//       // TODO: replace this with our custom exception
//       throw new NotFoundException(`Entity with ID ${id} not found`);
//     }
//     return entity;
//   }

//   async create(data: DeepPartial<T> | DeepPartial<T>[]): Promise<T | T[]> {
//     const resolvedData = await this.resolveRelations(data);

//     // Debugging
//     console.log('resolvedData is:', resolvedData);

//     const entities = this.repository.create(resolvedData);
//     return await this.repository.save(entities);
//   }

//   async update(id: number, data: DeepPartial<T>): Promise<T> {
//     const entity = await this.findById(id);
//     const resolvedData = await this.resolveRelations(data);
//     Object.assign(entity, resolvedData);
//     return await this.repository.save(entity);
//   }

//   async delete(id: number): Promise<void> {
//     // call the findById for the id to check if entity with id is exited or not
//     await this.findById(id);
//     await this.repository.delete(id);
//   }
// }
