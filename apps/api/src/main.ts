import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
// import cookieParser from 'cookie-parser';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  const config = app.get(ConfigService);
  const port = config.get('API_PORT');
  // const allowedCors = config.get('CORS_ORIGINS').split(',');

  app.enableCors({ origin: '*'});
  app.setGlobalPrefix(globalPrefix);

  // Security middleware
  app.use(helmet());
  // app.use(cookieParser());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: config.get('ENV') === 'development' ? Infinity : 100,
    }),
  );
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);
  Logger.log(`� Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();