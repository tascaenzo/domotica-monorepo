import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { IotDevicesService } from '../iot-device/iot-devices.service';
import { EventPayloadInterface } from './interfaces/event-payload.interface';
import { MqttMessageInterface } from './interfaces/mqtt-message.interface';
import { EVENT_TYPE } from './enums/device-event-type.enum';
import { INJECTABLE_PROVIDER } from '../injectable.enum';
import { DEVICE_TYPE } from '@domotica/shared/enums';
import { TOPIC } from './enums/topic.enum';
import { Logger } from '../logger';
import { MqttClient } from 'mqtt';

@Injectable()
export class EventService {
  constructor(
    @Inject(INJECTABLE_PROVIDER.MQTT_SERVICE) mqttService: MqttClient,
    private eventEmitter: EventEmitter2,
    private iotDeviceService: IotDevicesService,
    private logger: Logger,
  ) {
    this.onMessage = this.onMessage.bind(this);
    mqttService.on('message', this.onMessage);
  }

  private async onMessage(topic: string, messageRaw: Buffer) {
    try {
      const message: MqttMessageInterface = JSON.parse(messageRaw.toString().replace(/\n/g, ''));
      const device = await this.iotDeviceService.findOne(message.macAddres);
      const payload: EventPayloadInterface = { message, device };

      if (topic !== TOPIC.DEVICES) return;

      if (!device) {
        this.logger.log({
          message: `device not found: ${message.macAddres}`,
          context: EventService.name,
          save: true,
        });

        return;
      }

      switch (device.type) {
        case DEVICE_TYPE.ENERGY_MONITOR:
          this.eventEmitter.emit(EVENT_TYPE.ENERGY_MONITOR, payload);
          break;

        default:
          this.logger.log({
            message: `device type not mapped: ${device.type}`,
            context: EventService.name,
            save: true,
          });
          break;
      }
    } catch (error) {
      this.logger.error({ message: error, context: EventService.name, save: true });
    }
  }

  sendMessage(macAddres: string, message: object) {
    this.eventEmitter.emit(macAddres, message);
  }
}
