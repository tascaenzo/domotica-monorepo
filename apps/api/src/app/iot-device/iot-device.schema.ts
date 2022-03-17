
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { IotDeviceInterface } from '@domotica/shared/interfaces';
import { DEVICE_TYPE } from '@domotica/shared/enums';

export type IotDeviceDocument = IotDevice & Document;

@Schema({ timestamps: true, versionKey: false, toJSON: { getters: true } })
export class IotDevice implements IotDeviceInterface {
  id: string;

  @Prop({ default: null })
  chipId: string;

  @Prop({ default: null })
  macAddress: string;

  @Prop({ default: null, type: String })
  type: DEVICE_TYPE;

  @Prop({ default: null })
  label: string;

  @Prop({ default: null })
  deletedAt: Date;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const IotDeviceSchema = SchemaFactory.createForClass(IotDevice);
