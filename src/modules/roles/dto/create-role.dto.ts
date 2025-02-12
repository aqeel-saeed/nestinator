import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { IsExisted } from 'src/shared/validators/is-existed.validator';

export class CreateRoleDto {
  @ApiProperty({
    example: 'Test Role',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name_en: string;

  @ApiProperty({
    example: 'دور التجربة',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name_ar: string;

  @ApiProperty({
    example: 'This role is only to test roles and permissions logic.',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  description_en: string;

  @ApiProperty({
    example: 'هذا الدور فقط لتجربة عمل الأدوار والصلاحيات.',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  description_ar: string;

  @IsArray()
  @IsInt({ each: true })
  @IsExisted({
    table: 'permissions',
    column: 'id',
  })
  @IsOptional()
  permissionIds?: number[];
}
