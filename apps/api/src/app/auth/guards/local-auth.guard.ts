import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor(context: string) {
    super(context);
  }

  async validate(username: string, password: string): Promise<any> {    
    /* const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user; */
    return true;
  }
}
