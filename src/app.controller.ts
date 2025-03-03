import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { BaseController } from './base/base.controller';

@Controller()
export class AppController extends BaseController {
  constructor(private readonly appService: AppService) {
    super();
  }

  @Get()
  getHello() {
    const res = this.appService.getHello();
    return this.successResponse(res);
  }
}
