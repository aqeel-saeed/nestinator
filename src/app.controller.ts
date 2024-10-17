import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { apiResponse } from './core/utils/auth.utils';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    const res = this.appService.getHello();
    return apiResponse(res);
  }
}
