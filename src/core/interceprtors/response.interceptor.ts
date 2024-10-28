import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { Observable, throwError } from 'rxjs';
  import { catchError, map } from 'rxjs/operators';
  
@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
        return next.handle().pipe(
            map((res: unknown) => this.responseHandler(res, context)),
            catchError((err: HttpException) =>
                throwError(() => this.errorHandler(err, context)),
                // sometimes when debugging I can not see the exception message, so I am using this instead of the using errorHandler method
                // throwError(err),
            ),
        );
    }
  
    errorHandler(exception: HttpException, context: ExecutionContext) {
      const ctx = context.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();

      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
      
      // extract the message from the exception response
      const exceptionResponse = exception.getResponse();
      let errorMessage = '';

      // Define the interface for the exception response
      interface ExceptionResponse {
        message?: string | string[];
        error?: string;
        statusCode?: number;
      }

      // Use type assertion to narrow down the type
      const responseBody = exceptionResponse as ExceptionResponse;

      // Check if the response is an object and extract the message
      if (responseBody && typeof responseBody === 'object' && 'message' in responseBody) {
        // If the message is an array, join them into a single string
        errorMessage = Array.isArray(responseBody.message)
            ? responseBody.message.join(', ')
            : responseBody.message;
      } else {
          errorMessage = exception.message;
      }
  
      response.status(status).json({
        status: false,
        statusCode: status,
        path: request.url,
        message: errorMessage,
        result: exception,
      });
    }
  
    responseHandler(res: any, context: ExecutionContext) {
      const ctx = context.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();
      const statusCode = response.statusCode;
      const result = res.data;

      return {
          status: true,
          path: request.url,
          statusCode,
          message: res.message,
          result: result,
      };
    }
  }
  