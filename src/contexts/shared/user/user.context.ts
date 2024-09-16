import { createContext, useEffect, useState, ReactNode } from "react";

import { onAuthStateChangedListener,
        signOutUser,
        createUserDocumentFromAuth } from "../../../utils/firebase/firebase.utils";

// actual value to be accessed
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null
});

export const UserProvider = ({ children: ReactNode }) => {
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