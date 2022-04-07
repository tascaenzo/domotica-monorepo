import { UserInterface } from '@domotica/shared/interfaces';
import { createContext, useState } from 'react';

interface AuthCtxStateInterface {
  user: UserInterface | null;
  setUser: (user: UserInterface | null) => void;
}

const AuthContext = createContext<AuthCtxStateInterface>({
  user: null,
  setUser: (user: UserInterface | null) => null,
});

const UseAuthContext = () => {
  const [user, setUser] = useState<UserInterface | null>(null);

  return { user, setUser };
};

export { AuthContext, UseAuthContext };
