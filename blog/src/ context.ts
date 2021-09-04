import { createContext } from "react";
import { UserT } from "./types";

type AppContextType = {
  user: UserT | null
}

const initial: AppContextType = {
  user: null
}

export const AppContext = createContext(initial);
