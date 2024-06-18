import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";

const darkTheme = createTheme({
    palette: {
        mode: "dark"
    }
});

const App: FC = () => {
    return (
        <ThemeProvider theme={darkTheme}>
            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route index Component={LandingPage} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;
