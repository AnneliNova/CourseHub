import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

function parseOrigins(value?: string): string[] {
  if (!value) return [];
  return value
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

function isVercelOrigin(origin: string) {
  try {
    const { hostname } = new URL(origin);
    return hostname.endsWith('.vercel.app');
  } catch {
    return false;
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  const allowed = parseOrigins(process.env.CORS_ORIGIN);

  app.enableCors({
    origin: (origin, callback) => {

      if (!origin) return callback(null, true);

      if (allowed.length === 0) return callback(null, true);

      const ok = allowed.includes(origin) || isVercelOrigin(origin);
      return callback(null, ok);
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  const port = Number(process.env.PORT) || 4000;
  await app.listen(port, '0.0.0.0');
}

bootstrap();
