import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './core/middlewares/logger.middleware';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './core/configurations/database/database.module';
import { AuthModule } from './auth/auth.module';
import * as Joi from '@hapi/joi';
import { APP_FILTER } from '@nestjs/core';
import { IsExistedConstraint } from './shared/validators/is-existed.validator';
import { SeederModule } from './seeder/seeder.module';
import { SharedModule } from './shared/shared.module';
import { PostsModule } from './modules/posts/posts.module';
import { UsersModule } from './modules/users/users.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { PermissionsModule } from './core/permissions/permissions.module';
import { RolesModule } from './modules/roles/roles.module';
import { ExceptionsLoggerFilter } from './shared/filters/exceptions-logger.filter';

@Module({
  imports: [
    PostsModule,
    ConfigModule.forRoot({
      // Validation for .env variables
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
        HOST_IP: Joi.string(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
      }),
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    CategoriesModule,
    PermissionsModule,
    SeederModule,
    RolesModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionsLoggerFilter,
    },
    AppService,
    IsExistedConstraint,
  ],
  exports: [IsExistedConstraint],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
