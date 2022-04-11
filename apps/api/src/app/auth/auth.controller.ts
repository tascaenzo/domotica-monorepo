import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  DeleteResponseInterface,
  JwtPyloadInterface,
} from '@domotica/shared/interfaces';
import {
  CONTROLLER_AUTH_PATH,
  CONTROLLER_BASE_PATH,
  RESOURCE,
  RESPONSE_STATUS,
} from '@domotica/shared/enums';
import { AuthService } from './auth.service';
import { AuthUser } from './decorator/auth-user.decorator';
import { SignInResponseDto } from './dto/sign-in-response.dto';
import { SignInDto } from './dto/sign-in-request.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserDto } from '../users/dto/user.dto';

@Controller(CONTROLLER_BASE_PATH.AUTH)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(CONTROLLER_AUTH_PATH.SIGN_IN)
  async signIn(@Body() signInDto: SignInDto): Promise<SignInResponseDto> {
    const session = await this.authService.signIn(signInDto);

    if (!session) throw new UnauthorizedException('Wrong email or password');

    return new SignInResponseDto(session);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(CONTROLLER_AUTH_PATH.SIGN_OUT)
  async signOut(
    @AuthUser() auth: JwtPyloadInterface
  ): Promise<DeleteResponseInterface> {
    const session = await this.authService.signOut(auth.session);

    if (!session) {
      throw new NotFoundException({ status: RESPONSE_STATUS.ERROR });
    }

    return {
      status: RESPONSE_STATUS.SUCCESS,
      resorce: RESOURCE.SESSION,
      id: session.id,
    };
  }

  @Post(CONTROLLER_AUTH_PATH.REFRESH)
  async refresh(
    @Body() dto: { refreshKey: string }
  ): Promise<SignInResponseDto> {
    const session = await this.authService.refresh(dto.refreshKey);

    if (!session) throw new UnauthorizedException('Invalid session');

    return session;
  }

  @UseGuards(JwtAuthGuard)
  @Get(CONTROLLER_AUTH_PATH.PROFILE)
  async profile(@AuthUser() auth: JwtPyloadInterface): Promise<UserDto> {
    const user = await this.authService.getAuthUser(auth.user.id);
    if (!user) throw new UnauthorizedException();

    return new UserDto(user);
  }
}
