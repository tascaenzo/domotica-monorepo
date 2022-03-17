import { USER_ROLE } from '@domotica/shared/enums';
import { UserInterface } from '@domotica/shared/interfaces';
import { IsEmail, IsString } from 'class-validator';

export class UserDto implements UserInterface {
  id: string;

  @IsString()
  role: USER_ROLE;

  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  password: string | undefined;
}
