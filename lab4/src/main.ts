// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Включаем CORS
  app.enableCors();

  // Подключаем статику вручную
  app.use(express.static(join(__dirname, '..', 'public')));

  await app.listen(3000);
  console.log(`App running at http://localhost:3000`);
}
bootstrap();
