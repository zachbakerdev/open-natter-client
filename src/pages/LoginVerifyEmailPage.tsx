import { Box, Button, Typography } from "@mui/material";
import VerifyCodeBox from "components/VerifyCodeBox";
import { FC, FormEventHandler, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import strings from "strings";

const LoginVerifyEmailPage: FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [errorText, setErrorText] = useState<string>("");
    const [verification, setVerification] = useState<string | null | undefined>(
        undefined
    );
    const [email, setEmail] = useState<string | null | undefined>(undefined);
    const [allowResend, setAllowResend] = useState<boolean>(true);
    const [sent, setSent] = useState<boolean>(false);

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        setVerification(searchParams.get("verification") ?? null);
        setEmail(searchParams.get("email") ?? null);
    }, [searchParams]);

    useEffect(() => {
        if (verification === null) navigate("/");
    }, [verification]);

    const [code, setCode] = useState<string>("");

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        let responseStatus: number;

        setLoading(true);
        setErrorText("");
        fetch("/api/user/register/verify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                verification,
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
                        navigate("/login");
                        break;
                    case 400:
                    case 403:
                    case 404:
                    case 500:
                        setErrorText(msg);
                        break;
                    default:
                        setErrorText(strings.invalidResponse);
                }
            })
            .catch(() => {
                setErrorText(strings.invalidResponse);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const resendEmail = (): void => {
        setAllowResend(false);

        let responseStatus: number;

        fetch("/api/user/register/resend_email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                verification
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
                        setSent(true);
                        break;
                    case 400:
                    case 404:
                    case 500:
                        setErrorText(msg);
                        break;
                    default:
                        setErrorText(strings.invalidResponse);
                }
            });
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}
            component="form"
            onSubmit={handleSubmit}
        >
            <Typography component="h1" variant="h4" marginBottom={3}>
                {strings.verifyEmail}
            </Typography>
            {email && (
                <Typography variant="body1" marginBottom={3}>
                    Email sent to {email}.
                </Typography>
            )}
            <VerifyCodeBox setCode={setCode} />
            <Button
                sx={{
                    marginTop: 3
                }}
                type="submit"
                variant="contained"
                disabled={loading || code.length !== 6}
            >
                {strings.submit}
            </Button>
            {!sent && (
                <Button
                    sx={{
                        marginTop: 2
                    }}
                    type="button"
                    variant="text"
                    onClick={resendEmail}
                    disabled={!allowResend}
                >
                    {strings.resendEmail}
                </Button>
            )}
            {sent && (
                <Typography sx={{ marginTop: 2 }} variant="body2">
                    {strings.emailSent}
                </Typography>
            )}
            {errorText.length > 0 && (
                <Typography
                    color="red"
                    variant="body1"
                    sx={{
                        marginTop: 3
                    }}
                >
                    {errorText}
                </Typography>
            )}
        </Box>
    );
};

export default LoginVerifyEmailPage;
