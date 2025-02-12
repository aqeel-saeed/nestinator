import { Injectable } from '@nestjs/common';
import { IMailService } from './interfaces/mail-service.interface';
import { NodeMailerAdapter } from './adapters/nodemailer.adapter';
import { SendMailDto } from './dto/send-mail.dto';

@Injectable()
export class MailService implements IMailService {
  constructor(private readonly mailAdapter: NodeMailerAdapter) {}

  async sendMail(sendMailDto: SendMailDto): Promise<void> {
    await this.mailAdapter.sendMail(sendMailDto);
  }
}
