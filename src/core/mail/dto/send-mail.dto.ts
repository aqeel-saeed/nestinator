import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class SendMailDto {
  @ApiProperty({
    description: 'Recipient email address',
    example: 'recipient@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  to: string;

  @ApiProperty({
    description: 'Email subject',
    example: 'Test Email',
  })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({
    description: 'Plain text body of the email',
    example: 'This is a test email.',
    required: false,
  })
  @IsString()
  @IsOptional()
  text?: string;

  @ApiProperty({
    description: 'HTML body of the email',
    example: '<p>This is a test email.</p>',
    required: false,
  })
  @IsString()
  @IsOptional()
  html?: string;
}
