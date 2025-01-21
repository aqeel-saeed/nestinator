import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './core/interceprtors/response.interceptor';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './core/configurations/swagger/swagger.configuration';
import { useContainer } from 'class-validator';

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

  // run the api on a certain port
  await app.listen(3000);

  /* run the app on a certain port and ip */
  // await app.listen(3000, '192.168.146.54');
}
bootstrap();
