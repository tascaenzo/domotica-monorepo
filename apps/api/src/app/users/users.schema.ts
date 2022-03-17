import { USER_ROLE } from '@domotica/shared/enums';
import { UserInterface } from '@domotica/shared/interfaces';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true, versionKey: false, toJSON: { getters: true } })
export class User implements UserInterface {
  id: string;

  @Prop({ required: true, default: USER_ROLE.USER, type: String })
  role: USER_ROLE;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: null })
  deletedAt: Date;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
