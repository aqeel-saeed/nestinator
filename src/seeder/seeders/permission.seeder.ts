import { Injectable } from "@nestjs/common";
import { BaseSeeder } from "./base-seeder.seeder";
import { Permission } from "../../core/modules/permissions/entities/permission.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { permissions } from "../../core/modules/permissions/permissions";

@Injectable()
export class PermissionSeeder extends BaseSeeder<Permission> {
    constructor (
        @InjectRepository(Permission)
        repository: Repository<Permission>
    ) {
        super(repository);
    }

    // Provide seed data
    protected getSeedData(): Permission[] {
        return permissions;
    }
}