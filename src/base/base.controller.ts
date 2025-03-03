import { HttpException, HttpStatus } from '@nestjs/common';

export abstract class BaseController {
  successResponse<T>(data: T, message: string) {
    return {
      success: true,
      message,
      data,
    };
  }

  errorResponse(message: string, status: HttpStatus = HttpStatus.BAD_REQUEST) {
    throw new HttpException(
      {
        success: false,
        message,
      },
      status,
    );
  }
}
