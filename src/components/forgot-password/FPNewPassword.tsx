import { Box, Button, TextField, Typography } from "@mui/material";
import React, { FC, FormEventHandler, useEffect, useState } from "react";
import strings from "strings";
import { ForgotPasswordRequestStatus } from "types";

const PASSWORD_LOWERCASE = /^.*[a-z].*$/;
const PASSWORD_UPPERCASE = /^.*[A-Z].*$/;
const PASSWORD_NUMBER = /^.*\d.*$/;
const PASSWORD_SPECIAL_CHARACTER =
    /^.*[ !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~].*$/;
const PASSWORD_COMPLETE =
    /^[ !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~A-Za-z0-9]{8,}$/;

export type FPNewPasswordProps = {
    status: ForgotPasswordRequestStatus;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    submitNewPassword: () => void;
};

const FPNewPassword: FC<FPNewPasswordProps> = ({
    status,
    password,
    setPassword,
    submitNewPassword
}) => {
    const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);

    const stripRequest: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        submitNewPassword();
    };

    useEffect(() => {
        let valid = true;
        if (!PASSWORD_LOWERCASE.test(password)) valid = false;
        if (!PASSWORD_UPPERCASE.test(password)) valid = false;
        if (!PASSWORD_NUMBER.test(password)) valid = false;
        if (!PASSWORD_SPECIAL_CHARACTER.test(password)) valid = false;
        if (!PASSWORD_COMPLETE.test(password)) valid = false;
        setIsPasswordValid(valid);
    }, [password]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%"
            }}
        >
            <Typography variant="h5">{strings.newPassword}</Typography>
            <Box
                component="form"
                onSubmit={stripRequest}
                sx={{
                    minWidth: "300px",
                    maxWidth: "800px",
                    width: "85%",
                    textAlign: "center"
                }}
            >
                <TextField
                    type="password"
                    fullWidth
                    margin="normal"
                    required
                    id="newPassword"
                    name="newPassword"
                    autoComplete="new-password"
                    autoFocus
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!isPasswordValid && password.length > 0}
                    placeholder={strings.newPassword}
                    helperText={
                        !isPasswordValid &&
                        password.length > 0 &&
                        strings.passwordRequirements
                    }
                />
                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                        mt: 2
                    }}
                    disabled={
                        status === "new-password-sending" || !isPasswordValid
                    }
                >
                    {strings.changePassword}
                </Button>
            </Box>
        </Box>
    );
};

export default FPNewPassword;
