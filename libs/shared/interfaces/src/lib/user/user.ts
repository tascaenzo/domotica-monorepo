import { USER_ROLE } from '@domotica/shared/enums';

export interface UserInterface {
  id: string;
  role: USER_ROLE;
  email: string;
  firstName: string;
  lastName: string;
  password?: string | undefined;
}
