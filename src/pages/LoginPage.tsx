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
import { FC, FormEventHandler, useContext, useState } from "react";
import strings from "strings";

const LoginPage: FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const authContext = useContext(AuthenticationContext);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
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
            <Box component="form" onSubmit={handleSubmit}>
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
                    sx={{ mt: 3, mb: 2 }}
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
            </Box>
        </Box>
    );
};

export default LoginPage;
