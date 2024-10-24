import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/base/base.repository";
import { Role } from "../entities/role.entity";

@Injectable()
export class RoleRepository extends BaseRepository<Role> {}
