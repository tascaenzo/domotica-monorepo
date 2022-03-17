import { SessionInterface } from '@domotica/shared/interfaces';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type SessionDocument = Session & Document;

@Schema({ timestamps: true, versionKey: false, toJSON: { getters: true } })
export class Session implements SessionInterface {
  id: string;

  @Prop({ default: null, unique: true })
  refreshKey?: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user: string;

  @Prop({ required: false })
  userAgent?: string;

  @Prop({ default: false })
  forceRefresh?: boolean;

  @Prop({ default: null })
  deletedAt: Date;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop({ default: null })
  refreshedAt: Date;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
