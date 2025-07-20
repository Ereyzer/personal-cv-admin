import { createContext, use } from "react";

export const UserContext = createContext();

export const useUser = () => use(UserContext);
