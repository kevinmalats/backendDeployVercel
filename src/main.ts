import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import dotenv = require('dotenv');
dotenv.config();
let port: number = parseInt(process.env.PORT) || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  try {
    await app.listen(port);
    console.log(`Server running on port ${port}`);
  } catch (e) {
    console.log(e);
    port++;
    bootstrap();
  }
}
bootstrap();
