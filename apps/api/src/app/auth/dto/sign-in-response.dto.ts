import { UserDto } from './../../users/dto/user.dto';
import { SignInResponseInterface, UserInterface } from '@domotica/shared/interfaces';
import { IsJWT, IsObject, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class SignInResponseDto implements SignInResponseInterface {
  @IsJWT()
  accessToken: string;

  @IsUUID()
  refreshKey: string;

  @IsObject()
  @ValidateNested()
  @Type(() => UserDto)
  user: UserInterface;

  constructor(partial: Partial<SignInResponseDto>) {
    Object.assign(this, partial);
  }
}
