import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SessionsService } from '../sessions/sessions.service';
import { UsersService } from '../users/users.service';
import { SignInResponseDto } from './dto/sign-in-response.dto';
import { SignInDto } from './dto/sign-in-request.dto';
import { Logger } from '../logger';
import { Session } from '../sessions/sessions.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly sessionsService: SessionsService,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly logger: Logger,
  ) {}

  async signIn(signInDto: SignInDto): Promise<SignInResponseDto | null> {
    try {
      const user = await this.userService.findByEmailAndPassword(signInDto.email, signInDto.password);

      if (!user) return null;

      const session = await this.sessionsService.create({ user: user.id });

      return {
        accessToken: this.jwtService.sign({ user, session: session.id }),
        refreshKey: session.refreshKey,
        user,
      };
    } catch (error) {
      this.logger.error({ message: error, context: AuthService.name, save: true });

      return null;
    }
  }

  async refresh(refreshKey: string): Promise<SignInResponseDto | null> {
    try {
      const session = await this.sessionsService.findByRefreshKey(refreshKey);

      if (!session || session.deletedAt) return null;

      const user = await this.userService.findOne(session.user);

      if (!user) return null;

      const updateSession = await this.sessionsService.update(session.id, { ...session, refreshedAt: new Date() });

      if (!updateSession) return null;

      return {
        accessToken: this.jwtService.sign({ user, session: session.id }),
        refreshKey: session.refreshKey,
        user,
      };
    } catch (error) {
      this.logger.error({ message: error, context: AuthService.name, save: true });

      return null;
    }
  }

  async signOut(id: string): Promise<Session | null> {
    try {
      return this.sessionsService.remove(id);
    } catch (error) {
      this.logger.error({ message: error, context: AuthService.name, save: true });

      return null;
    }
  }
}
