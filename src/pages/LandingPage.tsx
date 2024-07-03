import { Box, Typography } from "@mui/material";
import { FC } from "react";
import strings from "../strings";

const LandingPage: FC = () => {
    return (
        <Box
            style={{
                width: "100%"
            }}
        >
            <Typography variant="h4">{strings.title}</Typography>
        </Box>
    );
};

export default LandingPage;
