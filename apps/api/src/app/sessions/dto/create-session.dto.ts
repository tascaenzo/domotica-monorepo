import { SessionDto } from './session.dto';
import { PartialType } from '@nestjs/mapped-types';
import { IsMongoId } from 'class-validator';

class CreateSessionDto extends PartialType(SessionDto) {
  @IsMongoId()
  user: string;
}

export default CreateSessionDto;
