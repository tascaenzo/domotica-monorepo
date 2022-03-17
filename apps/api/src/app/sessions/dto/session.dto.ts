import { SessionInterface } from '@domotica/shared/interfaces';
import { IsBoolean, IsDate, IsMongoId, IsOptional, IsString, IsUUID } from 'class-validator';

export class SessionDto implements SessionInterface {
  @IsMongoId()
  id: string;

  @IsUUID()
  @IsOptional()
  refreshKey?: string;

  @IsOptional()
  @IsMongoId()
  user: string;

  @IsString()
  @IsOptional()
  userAgent?: string;

  @IsBoolean()
  forceRefresh: boolean;

  @IsDate()
  @IsOptional()
  deletedAt: Date;

  @IsDate()
  createdAt: Date;

  @IsDate()
  @IsOptional()
  updatedAt: Date;

  @IsDate()
  @IsOptional()
  refreshedAt: Date;
}
