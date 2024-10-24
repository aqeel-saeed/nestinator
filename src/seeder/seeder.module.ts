import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { PermissionSeeder } from './seeders/permission.seeder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from '../core/modules/permissions/entities/permission.entity';
import { DatabaseModule } from '../core/configurations/database/database.module';
import { Role } from '../core/modules/roles/entities/role.entity';
import { User } from '../core/modules/users/entities/user.entity';
import { Address } from '../core/modules/users/entities/address.entity';
import { Post } from '../core/modules/posts/entities/post.entity';
import { Category } from '../core/modules/categories/entities/category.entity';
import { AdminUserSeeder } from './seeders/admin-user.seeder';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([
      Permission,
      Role,
      User,
      Address,
      Post,
      Category
    ])
  ],
  providers: [
    SeederService,
    PermissionSeeder,
    AdminUserSeeder,
  ],
  exports: [
    SeederService
  ]
})
export class SeederModule {}
