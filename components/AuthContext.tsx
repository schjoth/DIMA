import { createContext, FC, ReactInstance, ReactNode } from "react";
import { authorize } from "../api/auth";

export type AuthState = {
  token: string;
};

const defaultState: AuthState = {
  token: "",
};

export const AuthContext = createContext<AuthState>(defaultState);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { token } = authorize();

  return (
    <AuthContext.Provider value={{ token }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
