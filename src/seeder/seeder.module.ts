import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { PermissionSeeder } from './seeders/permission.seeder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../core/configurations/database/database.module';
import { AdminUserSeeder } from './seeders/admin-user.seeder';
import { Permission } from '../core/permissions/entities/permission.entity';
import { Role } from '../modules/roles/entities/role.entity';
import { User } from '../modules/users/entities/user.entity';
import { Address } from '../modules/users/entities/address.entity';
import { Category } from '../modules/categories/entities/category.entity';
import { Post } from '../modules/posts/entities/post.entity';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Permission, Role, User, Address, Post, Category]),
  ],
  providers: [SeederService, PermissionSeeder, AdminUserSeeder],
  exports: [SeederService],
})
export class SeederModule {}
