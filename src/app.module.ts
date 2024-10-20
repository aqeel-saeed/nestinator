import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './core/middlewares/logger.middleware';
import { PostsModule } from './core/modules/posts/posts.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './core/configurations/database/database.module';
import { UsersModule } from './core/modules/users/users.module';
import { AuthModule } from './auth/auth.module';
import * as Joi from '@hapi/joi';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionsLoggerFilter } from './core/utils/exceptions-logger.filter';
import { CategoriesModule } from './core/modules/categories/categories.module';
import { IsExistedConstraint } from './shared/validators/is-existed.validator';
import { PermissionsModule } from './core/modules/permissions/permissions.module';
import { SeederModule } from './seeder/seeder.module';
import { RolesModule } from './core/modules/roles/roles.module';

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
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
      }),
      isGlobal: true,
      envFilePath: '.env'
    }), 
    DatabaseModule, 
    UsersModule, 
    AuthModule, 
    CategoriesModule, 
    PermissionsModule,
    SeederModule,
    RolesModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionsLoggerFilter,
    },
    AppService,
    IsExistedConstraint
  ],
  exports: [IsExistedConstraint]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}
