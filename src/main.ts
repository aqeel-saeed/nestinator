import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './core/interceprtors/response.interceptor';
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { setupSwagger } from './core/configurations/swagger/swagger.configuration';
import { useContainer } from 'class-validator';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Setup swagger Configuration
  setupSwagger(app);

  // use global pipes
  app.useGlobalPipes(new ValidationPipe());

  // use global interceptors
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // set global prefix for all routes
  app.setGlobalPrefix('/api');

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // Get ConfigService instance
  const config = app.get(ConfigService);

  // run the api on a certain port
  const PORT = config.get('PORT') ? config.get('PORT') : 3000;
  const HOST_IP = config.get('HOST_IP') ? config.get('HOST_IP') : '0.0.0.0';

  // run the app on a certain port and ip
  await app
    .listen(PORT)
    .then(() =>
      Logger.log(
        `Nestinator is running on the port http://${HOST_IP}:${PORT} 🚀`,
        'NestApplication',
      ),
    );
}
bootstrap();
