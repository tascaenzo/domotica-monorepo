import { Global, Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Log, Logschema } from './logger.schema';
import { LoggerService } from './logger.service';

@Global()
@Module({
  imports: [MongooseModule.forFeature([{ name: Log.name, schema: Logschema }])],
  providers: [LoggerService, Logger],
  exports: [MongooseModule, LoggerService, Logger],
})
export class LoggerModule {}
