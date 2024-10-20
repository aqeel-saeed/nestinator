import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsInt, IsOptional } from "class-validator";
import { IsExisted } from "src/shared/validators/is-existed.validator";

export class CreateUserDto {
    @ApiProperty({
        example: 'test@test.com',
        required: true,
    })
    email: string;

    @ApiProperty({
        example: 'test test',
        required: true,
    })
    name: string;

    @ApiProperty({
        example: 'Admin123!',
        required: true,
    })
    password: string;
    
    @IsArray()
    @IsInt({ each: true })
    @IsExisted({
        table: 'roles',
        column: 'id' 
    })
    roleIds?: number[];
}
