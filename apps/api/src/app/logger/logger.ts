import { Injectable, Logger as BaseLogger } from '@nestjs/common';
import { LogInterface } from './log.interface';
import { LOGGER_LEVEL } from './logger-level.enum';
import { LoggerService } from './logger.service';

@Injectable()
export class Logger extends BaseLogger {
  constructor(private readonly loggerService: LoggerService) {
    super();
  }

  log(log: LogInterface) {
    this.context = log.context || 'API';
    super.log(log.message);

    if (log.save) {
      this.loggerService.create(LOGGER_LEVEL.LOG, log.context, log.message, log.stack);
    }
  }

  error(log: LogInterface) {
    this.context = log.context || 'API';
    super.error(log.message);

    if (log.save || log.save === undefined) {
      this.loggerService.create(LOGGER_LEVEL.ERROR, log.context, log.message, log.stack);
    }
  }

  warn(log: LogInterface) {
    this.context = log.context || 'API';
    super.warn(log.message);

    if (log.save) {
      this.loggerService.create(LOGGER_LEVEL.WARN, log.context, log.message, log.stack);
    }
  }

  debug(log: LogInterface) {
    this.context = log.context || 'API';
    super.debug(log.message);

    if (log.save) {
      this.loggerService.create(LOGGER_LEVEL.DEBUG, log.context, log.message, log.stack);
    }
  }

  verbose(log: LogInterface) {
    this.context = log.context || 'API';
    super.verbose(log.message);

    if (log.save) {
      this.loggerService.create(LOGGER_LEVEL.VERBOSE, log.context, log.message, log.stack);
    }
  }
}
