import { IotDeviceInterface } from '@domotica/shared/interfaces';
import { MqttMessageInterface } from './mqtt-message.interface';

export interface EventPayloadInterface<T = unknown> {
  message: MqttMessageInterface<T>;
  device: IotDeviceInterface<T>;
}
