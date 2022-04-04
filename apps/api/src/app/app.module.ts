import { CacheModule, Module } from '@nestjs/common';
import { EventsModule } from './events/event.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { SessionsModule } from './sessions/sessions.module';
import { LoggerModule } from './logger/logger.module';
import { IotDevicesModule } from './iot-device/iot-devices.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { API_ENV } from '@domotica/env';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({ load: [API_ENV], isGlobal: true }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        ttl: configService.get<number>('TTL_CACHE'),
        isGlobal: true,
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DB_URI'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    LoggerModule,
    EventsModule,
    UsersModule,
    AuthModule,
    SessionsModule,
    IotDevicesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
