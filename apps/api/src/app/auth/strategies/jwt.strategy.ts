import { JwtPyloadInterface } from '@domotica/shared/interfaces';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { SessionsService } from '../../sessions/sessions.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(readonly configService: ConfigService, readonly sessionsService: SessionsService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPyloadInterface) {
    // Inser custom logic her
    const session = await this.sessionsService.findOne(payload.session);

    if (!session || session.deletedAt) {
      throw new UnauthorizedException('Invalid session');
    }

    if (session.forceRefresh) {
      throw new UnauthorizedException();
    }

    return { ...payload, session};
  }
}
