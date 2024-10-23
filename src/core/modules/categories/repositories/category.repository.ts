import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/base/base.repository";
import { Category } from "../entities/category.entity";

@Injectable()
export class CategoryRepository extends BaseRepository<Category> {}
