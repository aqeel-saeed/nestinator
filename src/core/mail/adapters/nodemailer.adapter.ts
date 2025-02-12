import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, Transporter } from 'nodemailer';
import { SendMailDto } from '../dto/send-mail.dto';
import { IMailService } from '../interfaces/mail-service.interface';

@Injectable()
export class NodeMailerAdapter implements IMailService {
  private transporter: Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASSWORD'),
      },
    });
  }

  async sendMail(sendMailDto: SendMailDto): Promise<void> {
    const { to, subject, text, html } = sendMailDto;
    await this.transporter.sendMail({
      from: this.configService.get<string>('MAIL_FROM'),
      to,
      subject,
      text,
      html,
    });
  }
}
