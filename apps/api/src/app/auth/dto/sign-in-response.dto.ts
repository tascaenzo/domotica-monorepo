import {
  SignInResponseInterface,
  UserInterface,
} from '@domotica/shared/interfaces';
import { IsJWT, IsObject, IsUUID } from 'class-validator';

export class SignInResponseDto implements SignInResponseInterface {
  @IsJWT()
  accessToken: string;

  @IsUUID()
  refreshKey: string;

  @IsObject()
  user: UserInterface;

  constructor(partial: Partial<SignInResponseDto>) {
    Object.assign(this, partial);
  }
}
