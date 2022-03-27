import { DEVICE_TYPE } from '@domotica/shared/enums';

export interface IotDeviceResponseInterface<T = unknown> {
  id: string;
  chipId: string;
  macAddress: string;
  type: DEVICE_TYPE;
  label: string;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  state?: T;
}
