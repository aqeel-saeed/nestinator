import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsInt, IsNotEmpty, IsString } from "class-validator";
import { IsExisted } from "src/shared/validators/is-existed.validator";

export class CreateRoleDto {
    @ApiProperty({
        example: 'This is a greate conent for the new post !',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    name_en: string;

    @ApiProperty({
        example: 'This is a greate conent for the new post !',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    name_ar: string;

    @ApiProperty({
        example: 'This is a greate conent for the new post !',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    description_en: string;
    
    @ApiProperty({
        example: 'This is a greate conent for the new post !',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    description_ar: string;

    @IsArray()
    @IsInt({ each: true })
    @IsExisted({
        table: 'permissions',
        column: 'id' 
    })
    permissionIds: number[];
}
