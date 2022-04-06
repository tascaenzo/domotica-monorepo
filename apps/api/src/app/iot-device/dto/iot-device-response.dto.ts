import { DEVICE_TYPE } from '@domotica/shared/enums';
import { IotDeviceResponseInterface } from '@domotica/shared/interfaces';
import {
  IsDate,
  IsEnum,
  IsMACAddress,
  IsMongoId,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class IotDeviceResponseDto implements IotDeviceResponseInterface {
  @IsMongoId()
  id: string;

  @IsString()
  chipId: string;

  @IsMACAddress()
  macAddress: string;

  @IsEnum(DEVICE_TYPE)
  type: DEVICE_TYPE;

  @IsString()
  label: string;

  deletedAt: Date | null;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  @IsObject()
  @IsOptional()
  state?: unknown;

  constructor(partial: Partial<IotDeviceResponseDto>) {
    Object.assign(this, partial);
  }
}
