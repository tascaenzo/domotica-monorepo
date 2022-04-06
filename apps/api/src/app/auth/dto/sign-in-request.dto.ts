import { SignInRequestInterface } from '@domotica/shared/interfaces';
import { IsEmail, IsString } from 'class-validator';

export class SignInDto implements SignInRequestInterface {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  constructor(partial: Partial<SignInDto>) {
    Object.assign(this, partial);
  }
}
