import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { PermissionSeeder } from './seeders/permission.seeder';
import { AdminUserSeeder } from './seeders/admin-user.seeder';

@Injectable()
export class SeederService {
    constructor(
        private readonly dataSource: DataSource,
        private readonly premissionSeeder: PermissionSeeder,
        private readonly adminUserSeeder: AdminUserSeeder,
    ) {}

    async seedAll() {
        await this.dataSource.transaction(async (entityManager: EntityManager) => {
            // add all seeders here to run them
            // await this.adminUserSeeder.seed(entityManager);
            await this.premissionSeeder.seed(entityManager);
        });
    }    
}
