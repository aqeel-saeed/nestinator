
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IsExistedConstraint } from 'src/shared/validators/is-existed.validator';
 
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        name: 'default',
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: ['dist/**/*.entity.{ts,js}'],
        autoLoadEntities: true,
        synchronize: true,
        seeds: ['dist/**/*.seeder.{ts,js}'],
      })
    }),
  ],
})
export class DatabaseModule {}