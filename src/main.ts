/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import seedProducts from './database/seeds/seed-products';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const dataSource = app.get(DataSource);
  
  await seedProducts(dataSource);

  await app.listen(3000);
  console.log('Application is running on: http://localhost:3000');
}
bootstrap();
