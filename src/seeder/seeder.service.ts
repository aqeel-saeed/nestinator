import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { PermissionSeeder } from './seeders/permission.seeder';

@Injectable()
export class SeederService {
    constructor(
        private readonly dataSource: DataSource,
        private readonly premissionSeeder: PermissionSeeder
    ) {}

    async seedAll() {
        await this.dataSource.transaction(async (entityManager: EntityManager) => {
            // add all seeders here
            await this.premissionSeeder.seed(entityManager);
        });
    }    
}
