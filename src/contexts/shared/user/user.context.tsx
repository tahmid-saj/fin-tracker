import React, { createContext, useEffect, useState, FC } from "react";

import { onAuthStateChangedListener,
        signOutUser,
        createUserDocumentFromAuth } from "../../../utils/firebase/firebase.utils";
import { UserContextType, UserProviderProps } from "./user.types";

// actual value to be accessed
export const UserContext = createContext<UserContextType>({
  currentUser: null,
});

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const value = { currentUser, setCurrentUser };

  // signOutUser();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }

      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider value={ value }>
      { children }
    </UserContext.Provider>
  );
};