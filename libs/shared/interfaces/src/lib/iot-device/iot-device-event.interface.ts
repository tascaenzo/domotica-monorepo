import { IotDeviceResponseInterface } from './iot-device-response';

export interface IotDeviceEventInterface<T = unknown> {
  deviceId: string;
  device: IotDeviceResponseInterface;
  state: T;
}
