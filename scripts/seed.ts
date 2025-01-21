import { NestFactory } from '@nestjs/core';
import { SeederModule } from '../src/seeder/seeder.module';
import { SeederService } from '../src/seeder/seeder.service';
import { config } from 'dotenv';

config();

async function bootstrap() {
  // create the NestJS application context for seeding
  const app = await NestFactory.createApplicationContext(SeederModule);

  // get the SeederService
  const seederService = app.get(SeederService);

  try {
    // run the seeding process
    await seederService.seedAll();
    console.log('Seeding finished successfully.');
  } catch (error) {
    console.log('Seeding failed:', error);
  } finally {
    // close the app context
    await app.close();
  }
}

bootstrap();
