import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Nestinator Api')
    .setDescription('My Nestinator Api Documentation.')
    .setVersion('0.1')
    .addServer('api')
    .addBearerAuth(
      {
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'Authorization',
    )
    .build();

  /* to enable swagger only for certain modules */
  // const options: SwaggerDocumentOptions = {
  //     include: // <swaggerModules>
  // };

  const document = SwaggerModule.createDocument(
    app,
    config,
    /* add options variable here when enable swagger only for certian modules */
    // options
  );
  SwaggerModule.setup('api-docs', app, document);
}
