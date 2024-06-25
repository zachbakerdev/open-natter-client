import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material";
import Authorizer from "components/navigation/Authorizer";
import AuthenticationContext, {
    AuthContextData
} from "contexts/AuthenticationContext";
import useAuthStorage from "hooks/useAuthStorage";
import { FC, PropsWithChildren, useMemo, useState } from "react";
import { BrowserRouter } from "react-router-dom";

const theme = createTheme({
    palette: {
        mode: "dark"
    }
});

const ApplicationWrapper: FC<PropsWithChildren> = ({ children }) => {
    const [remember, setRemember] = useState(true);
    const authenticationData = useAuthStorage(remember);

    const contextData: AuthContextData = useMemo(
        () => ({
            ...authenticationData,
            remember,
            setRemember
        }),
        [authenticationData, remember, setRemember]
    );

    return (
        <AuthenticationContext.Provider value={contextData}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter>
                    <Authorizer />
                    {children}
                </BrowserRouter>
            </ThemeProvider>
        </AuthenticationContext.Provider>
    );
};

export default ApplicationWrapper;
