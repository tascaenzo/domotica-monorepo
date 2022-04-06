import { DEVICE_TYPE } from "@domotica/shared/enums";

export interface IotDeviceUpdateInterface <T = unknown> {
  chipId?: string;
  type?: DEVICE_TYPE;
  label?: string;
  deletedAt?: Date | null;
  state?: T;
}
