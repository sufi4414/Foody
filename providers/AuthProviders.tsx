import React, { createContext, useState, useContext, ReactNode } from "react";

interface AuthContextType {
  myId: string | null;
  setUserId: (myId: string | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
  myId: null,
  setUserId: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProviders = ({ children }: { children: ReactNode }) => {
  const [myId, setUserId] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ myId, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
};
