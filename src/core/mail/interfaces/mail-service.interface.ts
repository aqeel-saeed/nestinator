import { SendMailDto } from '../dto/send-mail.dto';

export interface IMailService {
  sendMail(sendMailDto: SendMailDto): Promise<void>;
}
