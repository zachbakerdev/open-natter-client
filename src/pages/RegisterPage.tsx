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

const USERNAME_REGEX = /^[A-Za-z]\w{1,28}[A-Za-z0-9]$/;
const EMAIL_REGEX =
    /^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
const PASSWORD_LOWERCASE = /^.*[a-z].*$/;
const PASSWORD_UPPERCASE = /^.*[A-Z].*$/;
const PASSWORD_NUMBER = /^.*\d.*$/;
const PASSWORD_SPECIAL_CHARACTER =
    /^.*[ !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~].*$/;
const PASSWORD_COMPLETE =
    /^[ !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~A-Za-z0-9]{8,}$/;

const RegisterPage: FC = () => {
    useTitle("Register");

    const navigate = useNavigate();

    const [errorText, setErrorText] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [isUsernameValid, setIsUsernameValid] = useState<boolean>(false);
    const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
    const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);

    useEffect(() => {
        setIsUsernameValid(USERNAME_REGEX.test(username));
    }, [username]);
    useEffect(() => {
        setIsEmailValid(EMAIL_REGEX.test(email));
    }, [email]);
    useEffect(() => {
        let valid = true;
        if (!PASSWORD_LOWERCASE.test(password)) valid = false;
        if (!PASSWORD_UPPERCASE.test(password)) valid = false;
        if (!PASSWORD_NUMBER.test(password)) valid = false;
        if (!PASSWORD_SPECIAL_CHARACTER.test(password)) valid = false;
        if (!PASSWORD_COMPLETE.test(password)) valid = false;
        setIsPasswordValid(valid);
    }, [password]);

    const authContext = useContext(AuthenticationContext);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        let responseStatus: number;

        setErrorText("");
        setLoading(true);
        fetch(`/api/user/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                email,
                password
            })
        })
            .then((response) => {
                responseStatus = response.status;
                return response.json();
            })
            .then((body) => {
                const { msg, verification } = body;

                switch (responseStatus) {
                    case 200:
                        navigate(`./verify?verification=${verification}`);
                        break;
                    case 400:
                    case 403:
                    case 409:
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
                {strings.register}
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
                    fullWidth
                    margin="normal"
                    required
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    error={!isUsernameValid && username.length > 0}
                    helperText={
                        !isUsernameValid &&
                        username.length > 0 &&
                        strings.usernameRequirements
                    }
                />
                <TextField
                    fullWidth
                    margin="normal"
                    required
                    type="email"
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!isEmailValid && email.length > 0}
                    helperText={
                        !isEmailValid &&
                        email.length > 0 &&
                        strings.emailRequirements
                    }
                />
                <TextField
                    fullWidth
                    margin="normal"
                    required
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!isPasswordValid && password.length > 0}
                    helperText={
                        !isPasswordValid &&
                        password.length > 0 &&
                        strings.passwordRequirements
                    }
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
                    disabled={
                        loading ||
                        !isUsernameValid ||
                        !isEmailValid ||
                        !isPasswordValid
                    }
                >
                    {strings.register}
                </Button>
                <Grid container>
                    <Grid item xs />
                    <Grid item>
                        <InternalLink to="/login" variant="body2">
                            {strings.alreadyHaveAccount}
                        </InternalLink>
                    </Grid>
                </Grid>
                {errorText.length > 0 && (
                    <Typography color="red" variant="body1">
                        {errorText}
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default RegisterPage;
