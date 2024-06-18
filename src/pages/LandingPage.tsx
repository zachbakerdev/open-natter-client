import { Container, Typography } from "@mui/material";
import { FC } from "react";
import strings from "../strings";

const LandingPage: FC = () => {
    return (
        <Container>
            <Typography variant="h1">{strings.title}</Typography>
        </Container>
    );
};

export default LandingPage;
