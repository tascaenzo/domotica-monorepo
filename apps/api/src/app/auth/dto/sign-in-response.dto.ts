import { SignInResponseInterface, UserInterface } from '@domotica/shared/interfaces';

export class SignInResponseDto implements SignInResponseInterface {
  accessToken: string;
  refreshKey: string;
  user: UserInterface;
}
