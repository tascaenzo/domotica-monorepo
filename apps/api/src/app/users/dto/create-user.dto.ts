import { USER_ROLE } from '@domotica/shared/enums';
import { PartialType } from '@nestjs/mapped-types';
import { Exclude } from 'class-transformer';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { UserDto } from './user.dto';

export class CreateUserDto extends PartialType(UserDto) {
  @IsString()
  @IsOptional()
  role: USER_ROLE;

  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @Exclude()
  password: string;

  @Exclude()
  _id: string;

  constructor(partial: Partial<CreateUserDto>) {
    super();
    Object.assign(this, partial);
  }
}
