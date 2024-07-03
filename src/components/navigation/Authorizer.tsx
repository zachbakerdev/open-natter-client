import AuthenticationContext from "contexts/AuthenticationContext";
import { FC, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const unauthorizedPaths: string[] = ["/login", "/register"];

const Authorizer: FC = () => {
    const authContext = useContext(AuthenticationContext);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (authContext.expired === null || authContext.expired === true) {
            const authed: boolean = unauthorizedPaths.some((value) =>
                location.pathname.startsWith(value)
            );

            if (!authed) {
                navigate("/login");
            }
        }
    }, [authContext.expired, location.pathname]);

    return null;
};

export default Authorizer;
