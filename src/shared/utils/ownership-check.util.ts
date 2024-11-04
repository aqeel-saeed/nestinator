import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";

@Injectable()
export class OwnershipCheckService {
    constructor(
        private readonly dataSource: DataSource
    ) {}

    async isOwner(
        entityType: string,
        entityId: number,
        userId: number,
        relationPath: string[], // array representing the relationship path
        ownerField: string = 'userId' // customizable owner field, defaults to 'userId'
    ) : Promise<boolean> {
        // Get the repository for the target entity
        const repo = this.dataSource.getRepository(entityType);

        if (relationPath.length > 0) {
            ///////////////////////////////
            // TODO: THIS CASE NEED TEST //
            ///////////////////////////////
            
            let qb = repo.createQueryBuilder(entityType);
            let alias = entityType.toLowerCase();

            for (let i = 0; i < relationPath.length; i++) {
                const relation = relationPath[i];
                const nextAlias = relation.toLowerCase();

                qb = qb.innerJoin(`${alias}.${relation}`, nextAlias);
                alias = nextAlias;
            }

            const result = await qb
                .where(`${alias}.${ownerField} = :userId`, { userId })
                .andWhere(`${entityType.toLowerCase()}.id = :entityId`, { entityId })
                .getOne();

            return !!result;
        } else {
            const result = await repo
                .createQueryBuilder(entityType.toLowerCase())
                .where(`${entityType.toLowerCase()}.id = ${entityId}`)
                .andWhere(`${entityType.toLowerCase()}.${ownerField} = ${userId}`)
                .getOne()
                ;
            
            // debugging log
            // console.log('DD Result SQL', result.getSql()); // but we have to comment the getOne() in the result
            // console.log('DD Result', await result.getOne());

            // return true if the entity exists (ownership verified), otherwise false
            return !!result;
        }
    }
}
