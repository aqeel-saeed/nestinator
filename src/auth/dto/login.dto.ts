import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'test@test.com',
    required: true,
  })
  email: string;

  @ApiProperty({
    example: 'Admin123!',
    required: true,
  })
  password: string;
}
