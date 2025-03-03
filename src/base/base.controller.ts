import { HttpException, HttpStatus } from '@nestjs/common';

export abstract class BaseController {
  successResponse<T>(message: string = '', data?: T) {
    return {
      success: true,
      message,
      ...(data !== undefined && { data }), // Only add `data` if it's provided
    };
  }

  errorResponse(
    message: string = '',
    status: HttpStatus = HttpStatus.BAD_REQUEST,
  ) {
    throw new HttpException(
      {
        success: false,
        message,
      },
      status,
    );
  }
}
