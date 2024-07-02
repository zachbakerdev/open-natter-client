import ApplicationWrapper from "components/layout/ApplicationWrapper";
import PageBoundingBox from "components/layout/PageBoundingBox";
import ScreenBoundingBox from "components/layout/ScreenBoundingBox";
import Sidebar from "components/navigation/Sidebar";
import Error404 from "pages/Error404";
import ForgotPasswordPage from "pages/ForgotPasswordPage";
import LoginPage from "pages/LoginPage";
import LoginVerifyEmailPage from "pages/LoginVerifyEmailPage";
import RegisterPage from "pages/RegisterPage";
import RegisterVerifyEmailPage from "pages/RegisterVerifyEmailPage";
import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

const App: FC = () => {
    return (
        <ApplicationWrapper>
            <ScreenBoundingBox>
                <Routes>
                    <Route path="/@/*" Component={Sidebar} />
                    <Route path="*" element={null} />
                </Routes>
                <PageBoundingBox>
                    <Routes>
                        <Route path="login">
                            <Route index Component={LoginPage} />
                            <Route
                                path="verify"
                                Component={LoginVerifyEmailPage}
                            />
                            <Route
                                path="forgot-password"
                                Component={ForgotPasswordPage}
                            />
                        </Route>
                        <Route path="register">
                            <Route index Component={RegisterPage} />
                            <Route
                                path="verify"
                                Component={RegisterVerifyEmailPage}
                            />
                        </Route>
                        <Route path="*" Component={Error404} />
                    </Routes>
                </PageBoundingBox>
            </ScreenBoundingBox>
        </ApplicationWrapper>
    );
};

export default App;
