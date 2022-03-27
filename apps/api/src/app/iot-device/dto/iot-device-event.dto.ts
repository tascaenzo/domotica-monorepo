import {
  IotDeviceEventInterface,
  IotDeviceResponseInterface,
} from '@domotica/shared/interfaces';
import { IsMongoId, IsObject } from 'class-validator';

export class IotDeviceEventDto implements IotDeviceEventInterface {
  @IsMongoId()
  deviceId: string;

  @IsObject()
  device: IotDeviceResponseInterface<unknown>;

  @IsObject()
  state: unknown;

  constructor(partial: Partial<IotDeviceEventDto>) {
    Object.assign(this, partial);
  }
}
