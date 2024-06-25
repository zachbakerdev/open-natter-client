import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material";
import { FC, PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";

const theme = createTheme({
    palette: {
        mode: "dark"
    }
});

const ApplicationWrapper: FC<PropsWithChildren> = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>{children}</BrowserRouter>
        </ThemeProvider>
    );
};

export default ApplicationWrapper;
