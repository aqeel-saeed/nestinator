import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { PermissionSeeder } from './seeders/permission.seeder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from '../core/modules/permissions/entities/permission.entity';
import { DatabaseModule } from '../core/configurations/database/database.module';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([
      Permission
    ])
  ],
  providers: [
    SeederService,
    PermissionSeeder,
  ],
  exports: [
    SeederService
  ]
})
export class SeederModule {}
