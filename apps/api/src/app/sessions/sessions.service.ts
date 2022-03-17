import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cache } from 'cache-manager';
import { v4 } from 'uuid';

import { Session, SessionDocument } from './sessions.schema';
import CreateSessionDto from './dto/create-session.dto';
import { Logger } from '../logger';

@Injectable()
export class SessionsService {
  constructor(
    private readonly logger: Logger,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectModel(Session.name) private sessionModel: Model<SessionDocument>,
  ) { }

  async create(createSessionDto: CreateSessionDto): Promise<Session | null> {
    try {
      const session = await this.sessionModel.create({
        ...createSessionDto,
        refreshKey: v4(),
      });

      return await this.cacheManager.set(session.id, session);
    } catch (error) {
      this.logger.error({ message: error, context: SessionsService.name, save: true });

      return null;
    }
  }

  async findOne(id: string): Promise<Session | null> {
    try {
      let session: Session = await this.cacheManager.get(id);

      if (!session) {
        session = await this.sessionModel.findOne({ _id: id });

        if (!session) return null;
        await this.cacheManager.set(session.id, session);
      }

      return session;
    } catch (error) {
      this.logger.error({ message: error, context: SessionsService.name, save: true });

      return null;
    }
  }

  async findByRefreshKey(refreshKey: string): Promise<Session | null> {
    try {
      const session = await this.sessionModel.findOne({ refreshKey }).populate('user');

      await this.cacheManager.del(session.id);

      return session;
    } catch (error) {
      this.logger.error({ message: error, context: SessionsService.name, save: true });

      return null;
    }
  }

  async update(id: string, session: Session): Promise<Session | null> {
    try {
      await this.cacheManager.del(id);

      return this.sessionModel.findOneAndUpdate({ _id: id }, session, {
        new: true,
      });
    } catch (error) {
      this.logger.error({ message: error, context: SessionsService.name, save: true });

      return null;
    }
  }

  async remove(id: string): Promise<Session | null> {
    try {
      await this.cacheManager.del(id);

      return this.sessionModel.findOneAndUpdate({ _id: id }, { deletedAt: new Date() }, { new: true });
    } catch (error) {
      this.logger.error({ message: error, context: SessionsService.name, save: true });

      return null;
    }
  }
}
