import React from "react";

export const AuthContext = React.createContext({});
export const useAuth = () => React.useContext(AuthContext);

export const AuthProviders = ({ children } : {children: React.ReactNode}) => {
    return(
        <AuthContext.Provider value={{}}>
            {children}
        </AuthContext.Provider>
    )
}