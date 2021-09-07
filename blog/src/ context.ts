import { createContext } from 'react';
import { UserT } from './types';

type AppContextType = {
  // false value when user is not authorized
  user: UserT | null | boolean
}

const initial: AppContextType = {
  user: null
}

export const AppContext = createContext(initial);
