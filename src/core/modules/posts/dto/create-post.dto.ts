import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsInt, IsNotEmpty, IsString } from "class-validator";
import { IsExisted } from "src/shared/validators/is-existed.validator";

export class CreatePostDto {
  @ApiProperty({
    example: 'This is a greate conent for the new post !',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    example: 'New Post',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  @IsInt({ each: true })
  @IsExisted({ table: 'categories', column: 'id' })
  categoryIds: number[];
}
