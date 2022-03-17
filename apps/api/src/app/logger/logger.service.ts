import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LOGGER_LEVEL } from './logger-level.enum';
import { Log, LogDocument } from './logger.schema';

@Injectable()
export class LoggerService {
  constructor(@InjectModel(Log.name) private logModel: Model<LogDocument>) {}

  create(level: LOGGER_LEVEL, context: string, message: string, stack?: unknown): void {
    this.logModel.create({
      level,
      context,
      message,
      stack,
    });
  }
}
