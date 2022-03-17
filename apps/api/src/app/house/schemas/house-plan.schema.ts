import { HousePlanInterface } from '@domotica/shared/interfaces';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type HousePlanDocument = HousePlan & Document;

@Schema({ timestamps: true, versionKey: false, toJSON: { getters: true } })
export class HousePlan implements HousePlanInterface {
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ default: [], type: [MongooseSchema.Types.ObjectId] })
  rooms: string[];

  @Prop({ default: null })
  deletedAt: Date;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const HousePlanSchema = SchemaFactory.createForClass(HousePlan);
