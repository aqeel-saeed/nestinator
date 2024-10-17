import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCateogryDto {
    @ApiProperty({
        example: 'Biography',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    name: string;
}
