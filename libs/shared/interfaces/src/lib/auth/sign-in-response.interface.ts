import { UserInterface } from '../user';

export interface SignInResponseInterface {
  accessToken: string;
  refreshKey: string
  user: UserInterface;
}
