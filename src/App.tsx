import ApplicationWrapper from "components/layout/ApplicationWrapper";
import PageBoundingBox from "components/layout/PageBoundingBox";
import ScreenBoundingBox from "components/layout/ScreenBoundingBox";
import Sidebar from "components/navigation/Sidebar";
import Error404 from "pages/Error404";
import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

const App: FC = () => {
    return (
        <ApplicationWrapper>
            <ScreenBoundingBox>
                <Routes>
                    <Route path="/@/*" Component={Sidebar} />
                </Routes>
                <PageBoundingBox>
                    <Routes>
                        <Route path="*" Component={Error404} />
                    </Routes>
                </PageBoundingBox>
            </ScreenBoundingBox>
        </ApplicationWrapper>
    );
};

export default App;
