import { Box, Typography } from "@mui/material";
import InternalLink from "components/navigation/InternalLink";
import { FC } from "react";
import strings from "strings";

const Error404: FC = () => {
    const isAtUrl = window.location.pathname.startsWith("/@/");

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                flexDirection: "column",
                gap: "10px"
            }}
        >
            <Typography variant="h1">{strings.error_404_title}</Typography>
            <Typography variant="h4">{strings.error_404}</Typography>
            <InternalLink to={isAtUrl ? "/@/" : "/"}>
                {strings.goHome}
            </InternalLink>
        </Box>
    );
};

export default Error404;
