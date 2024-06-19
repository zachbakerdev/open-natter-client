import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Sidebar from "components/navigation/Sidebar";
import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";

const theme = createTheme({
    palette: {
        mode: "dark"
    }
});

const App: FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
                style={{
                    display: "flex"
                }}
            >
                <Sidebar />
                <Box
                    style={{
                        padding: "15px"
                    }}
                >
                    <BrowserRouter>
                        <Routes>
                            <Route path="/">
                                <Route index Component={LandingPage} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default App;
