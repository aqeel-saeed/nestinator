import { ApiProperty } from "@nestjs/swagger";

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
}
