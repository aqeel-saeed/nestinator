import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { NodeMailerAdapter } from './adapters/nodemailer.adapter';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [
    MailService,
    {
      provide: 'IMailService',
      useClass: NodeMailerAdapter,
    },
    NodeMailerAdapter,
  ],
  exports: [MailService],
})
export class MailModule {}

export const MAIL_SERVICE_TOKEN = 'IMailService';
