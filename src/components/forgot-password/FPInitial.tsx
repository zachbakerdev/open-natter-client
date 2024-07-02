import { Box, Button, TextField } from "@mui/material";
import React, { FC, FormEventHandler, useEffect, useState } from "react";
import strings from "strings";
import { ForgotPasswordRequestStatus } from "types";

export type FPInitialProps = {
    status: ForgotPasswordRequestStatus;
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    sendRequest: () => void;
};

const EMAIL_REGEX =
    /^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

const FPInitial: FC<FPInitialProps> = ({
    status,
    email,
    setEmail,
    sendRequest
}) => {
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

    useEffect(() => {
        setButtonDisabled(!EMAIL_REGEX.test(email));
    }, [email]);

    const stripRequest: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        sendRequest();
    };

    return (
        <Box
            component="form"
            sx={{
                minWidth: "300px",
                maxWidth: "800px",
                width: "85%",
                textAlign: "center"
            }}
            onSubmit={stripRequest}
        >
            <TextField
                sx={{
                    marginBottom: 2
                }}
                type="email"
                value={email}
                placeholder="Email Address"
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
            />
            <Button
                type="submit"
                disabled={buttonDisabled || status === "request-sending"}
                variant="contained"
            >
                {strings.send}
            </Button>
        </Box>
    );
};

export default FPInitial;
