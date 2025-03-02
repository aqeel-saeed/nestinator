import { IsString, IsNotEmpty } from 'class-validator';
import { SendMailDto } from '../dto/send-mail.dto';

export class VerificationMailDto extends SendMailDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  constructor(to: string, code: string) {
    super();
    this.to = to;
    this.subject = 'Verify Your Email';
    this.text = `Your verification code is: ${code}`;
    this.html = `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px; max-width: 400px; margin: auto;">
        <h2>Email Verification</h2>
        <p>Hello,</p>
        <p>Your verification code is:</p>
        <p style="font-size: 24px; font-weight: bold; color: #333;">${code}</p>
        <p>Please enter this code in the app to verify your email.</p>
        <p>Thank you!</p>
      </div>
    `;
  }
}
