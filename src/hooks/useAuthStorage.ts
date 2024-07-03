import React, { useEffect, useState } from "react";

type AuthStorageData = {
    token: string;
    expiration: number;
};

export type AuthStorage = {
    token: string | null | undefined;
    expiration: number | null | undefined;
    expired: boolean | null | undefined;
    setToken: React.Dispatch<React.SetStateAction<string | null | undefined>>;
    setExpiration: React.Dispatch<
        React.SetStateAction<number | null | undefined>
    >;
};

const useAuthStorage = (remember: boolean): AuthStorage => {
    const [token, setToken] = useState<string | null | undefined>(undefined);
    const [expiration, setExpiration] = useState<number | null | undefined>(
        undefined
    );
    const [expired, setExpired] = useState<boolean | null | undefined>(
        undefined
    );

    // Check storages
    const localAuth = localStorage.getItem("authorization");
    const sessionAuth = sessionStorage.getItem("authorization");

    useEffect(() => {
        if (localAuth !== null) {
            const data: AuthStorageData = JSON.parse(localAuth);
            setToken(data.token);
            setExpiration(data.expiration);
        } else if (sessionAuth !== null) {
            const data: AuthStorageData = JSON.parse(sessionAuth);
            setToken(data.token);
            setExpiration(data.expiration);
        } else {
            setToken(null);
            setExpiration(null);
        }
    }, []);

    useEffect(() => {
        if (expiration === undefined) return;
        if (expiration === null) {
            setExpired(null);
        } else {
            setExpired(new Date(expiration) < new Date());
        }
    }, [expiration]);

    useEffect(() => {
        if (token === undefined) return;
        if (expiration === undefined) return;

        if (remember) {
            localStorage.setItem(
                "authorization",
                JSON.stringify({
                    token,
                    expiration
                })
            );
        } else {
            sessionStorage.setItem(
                "authorization",
                JSON.stringify({
                    token,
                    expiration
                })
            );
        }
    }, [token, expiration]);

    return {
        token,
        expiration,
        expired,
        setToken,
        setExpiration
    };
};

export default useAuthStorage;
