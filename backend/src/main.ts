import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const origin = process.env.CORS_ORIGIN || 'http://localhost:5173';
  app.enableCors({
    origin,
    credentials: true,
  });

  const port = Number(process.env.PORT || 4000);
  await app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`Backend is running on http://localhost:${port}`);
}

bootstrap();
