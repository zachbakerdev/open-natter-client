import { Box, Typography } from "@mui/material";
import FPCode from "components/forgot-password/FPCode";
import FPInitial from "components/forgot-password/FPInitial";
import FPNewPassword from "components/forgot-password/FPNewPassword";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import strings from "strings";
import { ForgotPasswordRequestStatus } from "types";

const ForgotPasswordPage: FC = () => {
    const navigate = useNavigate();

    const [status, setStatus] =
        useState<ForgotPasswordRequestStatus>("initial");
    const [email, setEmail] = useState<string>("");
    const [errorText, setErrorText] = useState<string>("");
    const [code, setCode] = useState<string>("");
    const [verification, setVerification] = useState<string | null>(null);
    const [password, setPassword] = useState<string>("");

    const sendRequest = (): void => {
        setStatus("request-sending");
        setErrorText("");

        let responseStatus: number;

        fetch("/api/user/login/forgot_password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email })
        })
            .then((response) => {
                responseStatus = response.status;

                return response.json();
            })
            .then((body) => {
                const { msg, uuid } = body;

                switch (responseStatus) {
                    case 200:
                        setVerification(uuid);
                        setStatus("request-accepted");
                        break;
                    case 404:
                    case 500:
                        setStatus("initial");
                        setErrorText(msg);
                        break;
                    default:
                        setStatus("initial");
                        setErrorText(strings.invalidResponse);
                }
            })
            .catch(() => {
                setStatus("initial");
                setErrorText(strings.invalidResponse);
            });
    };

    const checkCode = (): void => {
        setStatus("code-sending");
        setErrorText("");

        let responseStatus: number;

        fetch("/api/user/login/forgot_password/check_code", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                uuid: verification,
                code
            })
        })
            .then((response) => {
                responseStatus = response.status;
                return response.json();
            })
            .then((body) => {
                const { msg } = body;

                switch (responseStatus) {
                    case 200:
                        setStatus("code-correct");
                        break;
                    case 400:
                    case 404:
                        setErrorText(msg);
                        setStatus("code-incorrect");
                        break;
                    default:
                        setErrorText(strings.invalidResponse);
                        setStatus("code-incorrect");
                        break;
                }
            })
            .catch(() => {
                setErrorText(strings.invalidResponse);
                setStatus("code-incorrect");
            });
    };

    const submitNewPassword = (): void => {
        setStatus("new-password-sending");
        setErrorText("");

        let responseStatus: number;

        fetch("/api/user/login/reset_password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                key: verification,
                code,
                password
            })
        })
            .then((response) => {
                responseStatus = response.status;
                return response.json();
            })
            .then((body) => {
                const { msg } = body;

                switch (responseStatus) {
                    case 200:
                        navigate("/login");
                        break;
                    case 403:
                    case 404:
                    case 500:
                        setErrorText(msg);
                        setStatus("new-password-rejected");
                        break;
                    default:
                        setErrorText(strings.invalidResponse);
                        setStatus("new-password-rejected");
                }
            })
            .catch(() => {
                setErrorText(strings.invalidResponse);
                setStatus("new-password-rejected");
            });
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}
        >
            <Typography variant="h2" marginBottom={2}>
                {strings.forgotPasswordTitle}
            </Typography>
            {(status === "initial" || status === "request-sending") && (
                <FPInitial
                    status={status}
                    email={email}
                    setEmail={setEmail}
                    sendRequest={sendRequest}
                />
            )}
            {(status === "request-accepted" ||
                status === "code-sending" ||
                status === "code-incorrect") && (
                <FPCode
                    checkCode={checkCode}
                    code={code}
                    setCode={setCode}
                    status={status}
                />
            )}
            {(status === "code-correct" ||
                status === "new-password-sending" ||
                status === "new-password-rejected") && (
                <FPNewPassword
                    status={status}
                    password={password}
                    setPassword={setPassword}
                    submitNewPassword={submitNewPassword}
                />
            )}
            {errorText.length > 0 && (
                <Typography
                    variant="body1"
                    color="red"
                    sx={{
                        marginTop: 2
                    }}
                >
                    {errorText}
                </Typography>
            )}
        </Box>
    );
};

export default ForgotPasswordPage;
