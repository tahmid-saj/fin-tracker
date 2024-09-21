import { ReactNode } from "react";

export interface UserContextType {
  currentUser: any;
}

export interface UserProviderProps {
  children: ReactNode
}