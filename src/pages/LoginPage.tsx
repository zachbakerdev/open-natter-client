import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    TextField,
    Typography
} from "@mui/material";
import InternalLink from "components/navigation/InternalLink";
import AuthenticationContext from "contexts/AuthenticationContext";
import useTitle from "hooks/useTitle";
import { FC, FormEventHandler, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import strings from "strings";

const LoginPage: FC = () => {
    useTitle("Login");

    const navigate = useNavigate();

    const [errorText, setErrorText] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const authContext = useContext(AuthenticationContext);

    useEffect(() => {
        if (authContext.expired === false) navigate("/@/");
    }, [authContext.expired]);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        let responseStatus: number;

        setErrorText("");
        setLoading(true);
        fetch(`/api/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        })
            .then((response) => {
                responseStatus = response.status;
                return response.json();
            })
            .then((body) => {
                const { msg, token, verification } = body;

                switch (responseStatus) {
                    case 200:
                        authContext.setToken(token);
                        authContext.setExpiration(
                            new Date().getTime() + 2592000000
                        );
                        break;
                    case 403:
                        if (verification) navigate("./verify");
                        else setErrorText(msg);
                        break;
                    case 400:
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
        >
            <Typography component="h1" variant="h5">
                {strings.login}
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit}
                style={{
                    minWidth: "300px",
                    maxWidth: "800px",
                    width: "85%"
                }}
            >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="text"
                    label="Username"
                    name="text"
                    autoComplete="username"
                    autoFocus
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            value="remember"
                            color="primary"
                            checked={authContext.remember}
                            onChange={() => {
                                authContext.setRemember(
                                    (previous) => !previous
                                );
                            }}
                        />
                    }
                    label={strings.rememberMe}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, mb: 2 }}
                    disabled={loading || !username || !password}
                >
                    {strings.login}
                </Button>
                <Grid container>
                    <Grid item xs>
                        <InternalLink
                            to="/login/forgot-password"
                            variant="body2"
                        >
                            {strings.forgotPassword}
                        </InternalLink>
                    </Grid>
                    <Grid item>
                        <InternalLink to="/register" variant="body2">
                            {strings.noAccount}
                        </InternalLink>
                    </Grid>
                </Grid>
                {errorText.length > 0 && (
                    <Typography
                        color="red"
                        variant="body1"
                        sx={{
                            marginTop: 2
                        }}
                    >
                        {errorText}
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default LoginPage;
