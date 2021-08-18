import { createContext } from "react";
import { User } from "./types";

type AppContextType = {
  authorizedUser: User | null
}

const initial: AppContextType = {
  authorizedUser: null
}

export const AppContext = createContext(initial);
