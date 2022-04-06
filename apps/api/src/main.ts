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

  app.enableCors({
    //origin: ['http://localhost:8080', 'http://192.168.1.70:8080'],
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    credentials: false,
  });

  app.setGlobalPrefix(globalPrefix);

  // Security middleware
  app.use(helmet());
  // app.use(cookieParser());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: config.get('ENV') === 'development' ? Infinity : 100,
    })
  );
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port, '0.0.0.0');
  Logger.log(
    `� Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
