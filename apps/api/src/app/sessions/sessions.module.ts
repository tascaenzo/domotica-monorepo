import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Session, SessionSchema } from './sessions.schema';
import { SessionsService } from './sessions.service';
import { Logger } from '../logger';

@Module({
  imports: [MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }])],
  providers: [SessionsService, Logger],
  exports: [MongooseModule, SessionsService],
})
export class SessionsModule {}
