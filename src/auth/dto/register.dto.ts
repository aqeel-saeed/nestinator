import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";
import { Match } from "src/shared/validators/match.validator";

export class RegisterDto {
    @ApiProperty({
        example: 'test@test.com',
        required: true,
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'test test',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: 'Admin123!',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(7)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        // validate that the password has uppercase letters, lowercase letters, numbers and special chars
        message: 'password too weak',
      })
    password: string;

    @ApiProperty({
        description: 'same with the password to cofirm it',
        example: 'Admin123!',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(7)
    @Match('password')
    password_confirmation: string;
}