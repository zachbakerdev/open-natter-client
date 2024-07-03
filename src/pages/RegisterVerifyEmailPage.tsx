import { Box, Button, Typography } from "@mui/material";
import VerifyCodeBox from "components/VerifyCodeBox";
import { FC, FormEventHandler, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import strings from "strings";

const RegisterVerifyEmailPage: FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [errorText, setErrorText] = useState<string>("");
    const [verification, setVerification] = useState<string | null | undefined>(
        undefined
    );
    const [email, setEmail] = useState<string | null | undefined>(undefined);

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

export default RegisterVerifyEmailPage;
