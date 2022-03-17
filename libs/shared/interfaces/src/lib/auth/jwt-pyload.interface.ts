import { UserInterface } from "../user";

export interface JwtPyloadInterface {
  user: UserInterface;
  session: string;
}
