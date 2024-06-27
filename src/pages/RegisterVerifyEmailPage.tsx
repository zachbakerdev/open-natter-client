import { Box, Button, TextField, Typography } from "@mui/material";
import {
    FC,
    FormEventHandler,
    KeyboardEventHandler,
    useEffect,
    useRef,
    useState
} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import strings from "strings";

const inputBoxStyle = {
    width: "40px",
    textAlign: "center"
};

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

    const [digit1, setDigit1] = useState<string>("");
    const [digit2, setDigit2] = useState<string>("");
    const [digit3, setDigit3] = useState<string>("");
    const [digit4, setDigit4] = useState<string>("");
    const [digit5, setDigit5] = useState<string>("");
    const [digit6, setDigit6] = useState<string>("");

    const digit1Ref = useRef<HTMLInputElement>(null);
    const digit2Ref = useRef<HTMLInputElement>(null);
    const digit3Ref = useRef<HTMLInputElement>(null);
    const digit4Ref = useRef<HTMLInputElement>(null);
    const digit5Ref = useRef<HTMLInputElement>(null);
    const digit6Ref = useRef<HTMLInputElement>(null);

    const handleAdd = (digit: number, value: string): void => {
        if (!/^\d$/.test(value)) return;

        switch (digit) {
            case 1:
                if (digit1.length === 0) setDigit1(value);
                digit2Ref.current!.focus();
                break;
            case 2:
                if (digit2.length === 0) setDigit2(value);
                digit3Ref.current!.focus();
                break;
            case 3:
                if (digit3.length === 0) setDigit3(value);
                digit4Ref.current!.focus();
                break;
            case 4:
                if (digit4.length === 0) setDigit4(value);
                digit5Ref.current!.focus();
                break;
            case 5:
                if (digit5.length === 0) setDigit5(value);
                digit6Ref.current!.focus();
                break;
            case 6:
                if (digit6.length === 0) setDigit6(value);
                break;
            default:
                break;
        }
    };

    const handleSubtract = (digit: number): void => {
        switch (digit) {
            case 1:
                setDigit1("");
                break;
            case 2:
                setDigit2("");
                break;
            case 3:
                setDigit3("");
                break;
            case 4:
                setDigit4("");
                break;
            case 5:
                setDigit5("");
                break;
            case 6:
                setDigit6("");
                break;
            default:
                break;
        }
    };

    const getFocusedElement = (): number | null => {
        if (digit1Ref.current === document.activeElement) return 1;
        if (digit2Ref.current === document.activeElement) return 2;
        if (digit3Ref.current === document.activeElement) return 3;
        if (digit4Ref.current === document.activeElement) return 4;
        if (digit5Ref.current === document.activeElement) return 5;
        if (digit6Ref.current === document.activeElement) return 6;
        return null;
    };

    const handleUpdate = (digit: number, value: string): void => {
        if (value.length > 1) return;

        if (value.length === 1) handleAdd(digit, value);
        else if (value.length === 0) handleSubtract(digit);
    };

    const backIfEmpty = (focused: number): void => {
        switch (focused) {
            case 2:
                if (digit2 === "") {
                    setDigit1("");
                    digit1Ref.current!.focus();
                }
                break;
            case 3:
                if (digit3 === "") {
                    setDigit2("");
                    digit2Ref.current!.focus();
                }
                break;
            case 4:
                if (digit4 === "") {
                    setDigit3("");
                    digit3Ref.current!.focus();
                }
                break;
            case 5:
                if (digit5 === "") {
                    setDigit4("");
                    digit4Ref.current!.focus();
                }
                break;
            case 6:
                if (digit6 === "") {
                    setDigit5("");
                    digit5Ref.current!.focus();
                }
                break;
            default:
                break;
        }
    };

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
                code: digit1 + digit2 + digit3 + digit4 + digit5 + digit6
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

    const handleKeydown: KeyboardEventHandler = (event) => {
        if (event.key === "Backspace") {
            const focused: number | null = getFocusedElement();
            if (focused === null) return;
            backIfEmpty(focused);
        }
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
            onKeyDown={handleKeydown}
        >
            <Typography component="h1" variant="h4" marginBottom={3}>
                {strings.verifyEmail}
            </Typography>
            {email && (
                <Typography variant="body1" marginBottom={3}>
                    Email sent to {email}.
                </Typography>
            )}
            <Box display="flex" gap={1}>
                <TextField
                    sx={inputBoxStyle}
                    inputProps={{ style: { textAlign: "center" } }}
                    inputRef={digit1Ref}
                    value={digit1}
                    onChange={(e) => handleUpdate(1, e.target.value)}
                    autoFocus
                    autoComplete="off"
                />
                <TextField
                    sx={inputBoxStyle}
                    inputProps={{ style: { textAlign: "center" } }}
                    inputRef={digit2Ref}
                    value={digit2}
                    onChange={(e) => handleUpdate(2, e.target.value)}
                    autoComplete="off"
                />
                <TextField
                    sx={inputBoxStyle}
                    inputProps={{ style: { textAlign: "center" } }}
                    inputRef={digit3Ref}
                    value={digit3}
                    onChange={(e) => handleUpdate(3, e.target.value)}
                    autoComplete="off"
                />
                <TextField
                    sx={inputBoxStyle}
                    inputProps={{ style: { textAlign: "center" } }}
                    inputRef={digit4Ref}
                    value={digit4}
                    onChange={(e) => handleUpdate(4, e.target.value)}
                    autoComplete="off"
                />
                <TextField
                    sx={inputBoxStyle}
                    inputProps={{ style: { textAlign: "center" } }}
                    inputRef={digit5Ref}
                    value={digit5}
                    onChange={(e) => handleUpdate(5, e.target.value)}
                    autoComplete="off"
                />
                <TextField
                    sx={inputBoxStyle}
                    inputProps={{ style: { textAlign: "center" } }}
                    inputRef={digit6Ref}
                    value={digit6}
                    onChange={(e) => handleUpdate(6, e.target.value)}
                    autoComplete="off"
                />
            </Box>
            <Button
                sx={{
                    marginTop: 3
                }}
                type="submit"
                variant="contained"
                disabled={
                    loading ||
                    !digit1 ||
                    !digit2 ||
                    !digit3 ||
                    !digit4 ||
                    !digit5 ||
                    !digit6
                }
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
