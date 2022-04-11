import { USER_ROLE } from '@domotica/shared/enums';
import { UserInterface } from '@domotica/shared/interfaces';
import { IsEmail, IsMongoId, IsString } from 'class-validator';
import { Exclude } from 'class-transformer'

export class UserDto implements UserInterface {
  @IsMongoId()
  id: string;

  @IsString()
  role: USER_ROLE;

  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @Exclude()
  password?: string;

  @Exclude()
  _id: string;

  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }
}
