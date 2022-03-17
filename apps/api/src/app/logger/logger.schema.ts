import { LOGGER_LEVEL } from './logger-level.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LogDocument = Log & Document;

@Schema({ timestamps: true, versionKey: false, toJSON: { getters: true } })
export class Log {
  id: string;

  @Prop({ required: true, type: String })
  level: LOGGER_LEVEL;

  @Prop({ required: true })
  message: string;

  @Prop({ required: true })
  context: string;

  @Prop({ default: null, type: Object })
  stack: unknown;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const Logschema = SchemaFactory.createForClass(Log);
