import { Box, Button, Typography } from "@mui/material";
import VerifyCodeBox from "components/VerifyCodeBox";
import React, { FC, FormEventHandler } from "react";
import strings from "strings";
import { ForgotPasswordRequestStatus } from "types";

export type FPCodeProps = {
    checkCode: () => void;
    code: string;
    setCode: React.Dispatch<React.SetStateAction<string>>;
    status: ForgotPasswordRequestStatus;
};

const FPCode: FC<FPCodeProps> = ({ checkCode, code, setCode, status }) => {
    const stripRequest: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        checkCode();
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}
            component="form"
            onSubmit={stripRequest}
        >
            <Typography component="h1" variant="h4">
                {strings.enterResetCode}
            </Typography>
            <VerifyCodeBox setCode={setCode} />
            <Button
                sx={{
                    marginTop: 3
                }}
                type="submit"
                variant="contained"
                disabled={status === "code-sending" || code.length !== 6}
            >
                {strings.submit}
            </Button>
        </Box>
    );
};

export default FPCode;
