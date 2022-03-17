import { Module } from '@nestjs/common';
import { connectAsync } from 'async-mqtt';
import { EventService } from './event.service';
import { ConfigService } from '@nestjs/config';
import { INJECTABLE_PROVIDER } from '../injectable.enum';
import { IotDevicesModule } from '../iot-device/iot-devices.module';
import { IotDevicesService } from '../iot-device/iot-devices.service';
import { TOPIC } from './enums/topic.enum';

@Module({
  imports: [IotDevicesModule],
  controllers: [],
  providers: [
    EventService,
    IotDevicesService,
    {
      provide: INJECTABLE_PROVIDER.MQTT_SERVICE,
      useFactory: async (configService: ConfigService) => {
        const client = await connectAsync(configService.get<string>('MQTT_URI'));

        client.subscribe(TOPIC.DEVICES);

        return client;
      },
      inject: [ConfigService],
    },
  ],
})
export class EventsModule {}
