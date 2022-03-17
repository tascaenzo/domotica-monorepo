import { HouseRoomInterface } from '@domotica/shared/interfaces';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type HouseRoomDocument = HouseRoom & Document;

@Schema({ timestamps: true, versionKey: false, toJSON: { getters: true } })
export class HouseRoom implements HouseRoomInterface {
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ default: [], type: [MongooseSchema.Types.ObjectId] })
  iotDevices: [string];

  @Prop({ default: false })
  noPlan: boolean;

  @Prop({ default: null })
  deletedAt: Date;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const HouseRoomSchema = SchemaFactory.createForClass(HouseRoom);
