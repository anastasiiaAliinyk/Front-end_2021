import { createContext } from "react";
import { User } from "./types";

type AppContextType = {
  user: User | null
}

const initial: AppContextType = {
  user: null
}

export const AppContext = createContext(initial);
