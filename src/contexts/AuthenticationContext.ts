import { AuthStorage } from "hooks/useAuthStorage";
import React, { createContext } from "react";

export type AuthContextData = AuthStorage & {
    remember: boolean;
    setRemember: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthenticationContext = createContext<AuthContextData>({
    token: null,
    expiration: null,
    expired: null,
    setToken: () => {},
    setExpiration: () => {},
    remember: true,
    setRemember: () => {}
});

export default AuthenticationContext;
