import { PartialType } from "@nestjs/swagger";
import { CreateCateogryDto } from "./create-category.dto";

export class UpdateCategoryDto extends PartialType(CreateCateogryDto) {}