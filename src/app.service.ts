import { Injectable } from '@nestjs/common';
import { apiResponse } from './core/utils/auth.utils';

@Injectable()
export class AppService {
  getHello() {
    return 'Hello Fucking World!';
  }
}
