import { USER_ROLE } from '@domotica/shared/enums';
import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { UserDto } from './user.dto';

export class UpdateUserDto extends PartialType(UserDto) {
  @IsString()
  role?: USER_ROLE;

  @IsString()
  firstName?: string;

  @IsString()
  lastName?: string;
}
