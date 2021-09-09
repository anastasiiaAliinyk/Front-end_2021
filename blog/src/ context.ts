import { createContext } from 'react';
import { UserT } from './types';

type AppContextType = {
  user: UserT | null
  isAuthorized: boolean | null,
  setUser: ((user: UserT) => void) | null
}

const initial: AppContextType = {
  user: null,
  isAuthorized: null,
  setUser: null
}

export const AppContext = createContext(initial);
